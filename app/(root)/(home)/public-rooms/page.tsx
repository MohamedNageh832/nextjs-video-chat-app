import PublicMeetingCard from "@/components/PublicMeetingCard";
import { db } from "@/lib/db";

const Previous = async () => {
  const publicMeetings = await db.meetingRoom.findMany({
    where: { isPrivate: { equals: false } },
  });

  return (
    <section className="flex flex-col gap-10 size-full text-white">
      <h1 className="text-2xl font-bold">Public rooms</h1>

      <section className="flex flex-wrap gap-3">
        {publicMeetings.map((room) => (
          <PublicMeetingCard key={room.id} data={room} />
        ))}
      </section>
    </section>
  );
};

export default Previous;
