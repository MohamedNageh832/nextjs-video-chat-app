"use client";
import { FC, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { LiveKitRoom } from "@livekit/components-react";
import "@livekit/components-styles";
import { useUser } from "@clerk/nextjs";
import { promiseHandler } from "@/lib/promiseHandler";
import VideoChat from "./VideoChat";

type VideoChatRoomProps = {
  meetingId: string;
  videoOn: boolean;
  audioOn: boolean;
};

const VideoChatRoom: FC<VideoChatRoomProps> = (props) => {
  const { meetingId, videoOn, audioOn } = props;
  const { user } = useUser();
  const [token, setToken] = useState(null);
  // const trackRefs = useTracks([Track.Source.Camera]);

  useEffect(() => {
    if (!user || !user.firstName || !user.lastName) return;

    const name = `${user.firstName} ${user.lastName}`;

    const fetchRoom = fetch(`/api/livekit?room=${meetingId}&username=${name}`);

    (async () => {
      const [res, err] = await promiseHandler(fetchRoom);

      if (err || !res) return;

      const data = await res.json();

      setToken(data.token);
    })();
  }, [user, meetingId]);

  if (!token)
    return (
      <div className="flex-center flex-col w-screen h-screen gap-1 text-sky-1">
        <Loader2 className="h-7 w-7 animate-spin" /> <span>Loading...</span>
      </div>
    );

  return (
    <LiveKitRoom
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      video={videoOn}
      audio={audioOn}
    >
      {/* <VideoConference /> */}
      <VideoChat />
    </LiveKitRoom>
  );
};

export default VideoChatRoom;
