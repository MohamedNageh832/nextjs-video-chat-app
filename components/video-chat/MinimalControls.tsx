import { Track } from "livekit-client";
import { setupMediaToggle } from "@livekit/components-core";
import {
  useRoomContext,
  usePersistentUserChoices,
  TrackReference,
} from "@livekit/components-react";
import { Camera, CameraOff, Mic, MicOff } from "lucide-react";
import { Button } from "../ui/button";
import { FC, useCallback } from "react";

type MinimalControlsProps = {
  track: TrackReference;
};

const MinimalControls: FC<MinimalControlsProps> = ({ track }) => {
  if (!track) return null;

  const { saveAudioInputEnabled, saveVideoInputEnabled } =
    usePersistentUserChoices({ preventSave: false });

  const room = useRoomContext();
  const { toggle: toggleCamera } = setupMediaToggle(Track.Source.Camera, room);
  const { toggle: toggleMicrophone } = setupMediaToggle(
    Track.Source.Microphone,
    room
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

  return (
    <section className="justify-self-center flex-center gap-4">
      <Button className="p-0 bg-transparent" onClick={cameraOnChange}>
        {track.participant.isCameraEnabled ? (
          <Camera className="text-blue-1" size={20} />
        ) : (
          <CameraOff className="text-red-600" size={20} />
        )}
      </Button>

      <Button className="p-0 bg-transparent" onClick={microphoneOnChange}>
        {track.participant.isMicrophoneEnabled ? (
          <Mic className="text-blue-1" size={20} />
        ) : (
          <MicOff className="text-red-600" size={20} />
        )}
      </Button>
    </section>
  );
};

export default MinimalControls;
