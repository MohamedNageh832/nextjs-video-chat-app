import { Track } from "livekit-client";
import { setupMediaToggle } from "@livekit/components-core";
import {
  useRoomContext,
  usePersistentUserChoices,
  TrackReference,
} from "@livekit/components-react";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  MonitorDown,
  MonitorUp,
  Trash,
} from "lucide-react";
import { Button } from "../ui/button";
import { FC, useCallback, useEffect, useState } from "react";
import ParticipantsList from "./ParticipantsList";
import MediaDeviceSelect from "./MediaDeviceSelect";
import { promiseHandler } from "@/lib/promiseHandler";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "../ui/use-toast";

type MeetingControlsProps = {
  track: TrackReference;
};

const MeetingControls: FC<MeetingControlsProps> = ({ track }) => {
  const { saveAudioInputEnabled, saveVideoInputEnabled } =
    usePersistentUserChoices({ preventSave: false });
  const router = useRouter();
  const { user } = useUser();
  const { id: roomId } = useParams();
  const [ownerId, setOwnerId] = useState("");

  useEffect(() => {
    (async () => {
      const fetchOptions = { method: "POST", body: JSON.stringify({ roomId }) };
      const fetchRoomData = fetch("/api/fetch-meeting-room", fetchOptions);
      const [res, err] = await promiseHandler(fetchRoomData);

      if (err || !res) return;

      const roomData = await res.json();

      setOwnerId(roomData.ownerId);
    })();
  }, []);

  const room = useRoomContext();
  const { toggle: toggleCamera } = setupMediaToggle(Track.Source.Camera, room);
  const { toggle: toggleMicrophone } = setupMediaToggle(
    Track.Source.Microphone,
    room
  );
  const { toggle: toggleScreenShare } = setupMediaToggle(
    Track.Source.ScreenShare,
    room,
    { audio: false, selfBrowserSurface: "include" }
  );

  const microphoneOnChange = useCallback(() => {
    const status = !track.participant.isMicrophoneEnabled;

    toggleMicrophone(status);
    saveAudioInputEnabled(status);
  }, [track, toggleMicrophone, saveAudioInputEnabled]);

  const cameraOnChange = useCallback(() => {
    const status = !track.participant.isCameraEnabled;

    toggleCamera(status);
    saveVideoInputEnabled(status);
  }, [track, toggleCamera, saveVideoInputEnabled]);

  const screenShareOnChange = useCallback(() => {
    const status = !track.participant.isScreenShareEnabled;

    toggleScreenShare(status);
  }, [track, toggleScreenShare]);

  const handleDeleteMeeting = async () => {
    if (!user) return;
    const deleteMeetingRequest = fetch(`/api/delete-meeting`, {
      method: "POST",
      body: JSON.stringify({ userId: user.id, roomId }),
    });

    const [res, err] = await promiseHandler(deleteMeetingRequest);

    if (err || !res) return;

    const { success, msg } = await res.json();

    if (!success) return;

    toast({
      title: "Room deleted successfully",
      description: "Redirecting to the main page...",
    });

    router.push("/");
  };

  if (!track) return null;

  return (
    <section className="justify-self-center flex-center gap-4">
      <section className="flex-center gap-2 bg-blue-1 px-3 py-2 rounded hover:bg-blue-500">
        <button className="flex gap-1" onClick={cameraOnChange}>
          {track.participant.isCameraEnabled ? <Camera /> : <CameraOff />}
          Camera
        </button>
        <MediaDeviceSelect kind="videoinput" />
      </section>

      <section className="flex-center gap-2 bg-zinc-800 px-3 py-2 rounded hover:bg-zinc-700">
        <button className="flex gap-1" onClick={microphoneOnChange}>
          {track.participant.isMicrophoneEnabled ? <Mic /> : <MicOff />}
          Mic
        </button>
        <MediaDeviceSelect kind="audioinput" />
      </section>

      <Button
        className="flex-center gap-2 bg-zinc-800"
        onClick={screenShareOnChange}
      >
        {track.participant.isScreenShareEnabled ? (
          <MonitorDown />
        ) : (
          <MonitorUp />
        )}
      </Button>

      {user && user.id === ownerId && (
        <Button variant="ghost" onClick={handleDeleteMeeting}>
          <Trash /> Delete Meeting
        </Button>
      )}

      <ParticipantsList />
    </section>
  );
};

export default MeetingControls;
