import { FC, useEffect, useMemo, useState } from "react";
import { RoomEvent, RemoteParticipant } from "livekit-client";
import { UserRound } from "lucide-react";
import {
  ConnectionQualityIndicator,
  TrackReference,
  useRoomContext,
  VideoTrack,
} from "@livekit/components-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

type MeetingParticipantProps = {
  track: TrackReference;
};

const MeetingParticipant: FC<MeetingParticipantProps> = (props) => {
  const { user } = useUser();
  const { track } = props;
  const room = useRoomContext();
  const decoder = new TextDecoder();
  const [profileImg, setProfileImg] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !track.participant.isLocal) return;

    setProfileImg(user.imageUrl);
  }, [user, track.participant.isLocal]);

  // Receive data from other participants
  room.on(
    RoomEvent.DataReceived,
    (payload: Uint8Array, participant?: RemoteParticipant) => {
      const strData = decoder.decode(payload);
      const { profileImg } = JSON.parse(strData);

      if (!participant || participant.sid !== track.participant.sid) return;
      setProfileImg(profileImg);
    }
  );

  const renderPlaceholder = useMemo(() => {
    const participantName = track.participant.identity;
    return profileImg ? (
      <Image
        className="rounded-full"
        src={profileImg}
        alt={participantName + " image"}
        width={120}
        height={120}
      />
    ) : (
      <UserRound className="text-zinc-600" size={120} />
    );
  }, [profileImg, track.participant.identity]);

  return (
    <section
      className={cn(
        `relative aspect-video w-[300px] h-[168px] rounded-xl overflow-hidden border-solid border-2 border-transparent`,
        { "border-blue-1": track.participant.isSpeaking }
      )}
    >
      {track.participant.isCameraEnabled ? (
        <VideoTrack trackRef={track} />
      ) : (
        <section className="flex-center size-full bg-zinc-800">
          {renderPlaceholder}
        </section>
      )}
      <section className="absolute bottom-0 left-0 flex-between w-full bg-[rgba(0,0,0,0.5)] py-1 px-2">
        <p className="text-sm">{track.participant.identity}</p>

        <ConnectionQualityIndicator
          participant={track.participant}
          className="bg-[rgba(0,0,0,0.5)] rounded flex-center"
        />
      </section>
    </section>
  );
};

export default MeetingParticipant;
