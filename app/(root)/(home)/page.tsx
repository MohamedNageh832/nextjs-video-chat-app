import HomeBtns from "@/components/HomeBtns";
import JoinMeetingModal from "@/components/modals/JoinMeetingModal";
import StartMeetingModal from "@/components/modals/StartMeetingModal";
import PublicMeetingCard from "@/components/PublicMeetingCard";
import { db } from "@/lib/db";
import { loadUser } from "@/lib/loadUser";

const Home = async () => {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", { timeStyle: "short" });
  const date = now.toLocaleDateString("en-US", { dateStyle: "full" });

  const user = await loadUser();

  const personalMeetings = await db.meetingRoom.findMany({
    where: { ownerId: { equals: user.id } },
  });

  const publicMeetings = await db.meetingRoom.findMany({
    where: { isPrivate: { equals: false } },
  });

  const closestMeeting = personalMeetings.sort(
    (a, b) => a.startDateTime.getTime() - b.startDateTime.getTime()
  );

  const meetingTime =
    closestMeeting[0] &&
    closestMeeting[0].startDateTime.toLocaleTimeString("en-US", {
      timeStyle: "short",
    });

  const upcomingMeeting = meetingTime
    ? `Upcoming meeting at ${meetingTime}`
    : "No upcoming meetings";

  return (
    <section className="flex flex-col gap-10 size-full">
      <header className="flex flex-col justify-between w-full h-[286px] bg-hero rounded-lg bg-cover p-6">
        <h2 className="glassmorphism p-4 rounded text-center text-base max-w-[270px]">
          {upcomingMeeting}
        </h2>

        <section className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
          <p className="text-lg text-sky-1 font-medium lg:text-2xl">{date}</p>
        </section>
      </header>

      <HomeBtns />

      <section className="flex flex-col gap-5">
        <h2 className="text-2xl font-bold">Public rooms</h2>

        <section className="flex flex-wrap gap-3">
          {publicMeetings.map((room) => (
            <PublicMeetingCard key={room.id} data={room} />
          ))}
        </section>
      </section>

      <StartMeetingModal />
      <JoinMeetingModal />
    </section>
  );
};

export default Home;
