import VideoChatRoom from "@/components/video-chat/VideoChatRoom";
import { FC } from "react";

type MeetingType = {
  params: { id: string };
};

const Meeting: FC<MeetingType> = ({ params }) => {
  return (
    <section>
      <VideoChatRoom meetingId={params.id} videoOn={true} audioOn={true} />
    </section>
  );
};

export default Meeting;
