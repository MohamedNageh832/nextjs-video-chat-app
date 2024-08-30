"use client";

import PublicMeetingCard from "@/components/PublicMeetingCard";
import { toast } from "@/components/ui/use-toast";
import { promiseHandler } from "@/lib/promiseHandler";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Upcoming = () => {
  const { user } = useUser();
  const [upcomingMeetings, setUpcomingMeetings] = useState<any[] | null>(null);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const fetchOptions = {
        method: "POST",
        body: JSON.stringify({ userId: user.id }),
      };

      const fetchUpcoming = fetch("/api/upcoming-meetings", fetchOptions);
      const [res, err] = await promiseHandler(fetchUpcoming);

      if (err || !res) {
        return toast({
          title: "An error occured",
          description: `Error: ${err}`,
          variant: "destructive",
        });
      }

      const upcomingMeetings = await res.json();

      if (upcomingMeetings.length === 0) return;
      setUpcomingMeetings(upcomingMeetings);
    })();
  }, [user]);

  return (
    <section className="flex flex-col gap-10 size-full text-white">
      <h1 className="text-2xl font-bold">Upcoming</h1>

      {upcomingMeetings ? (
        <section className="flex flex-wrap gap-3">
          {upcomingMeetings.map((room) => (
            <PublicMeetingCard key={room.id} data={room} />
          ))}
        </section>
      ) : (
        <p>No upcoming meetings</p>
      )}
    </section>
  );
};

export default Upcoming;
