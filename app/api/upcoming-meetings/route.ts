import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { userId } = await request.json();

  const scheduledMeetings = await db.meetingRoom.findMany({
    where: { ownerId: userId },
  });

  const now = new Date();
  const isUpcoming = scheduledMeetings.filter(
    (room) => room.startDateTime.getTime() > now.getTime()
  );

  return NextResponse.json(isUpcoming);
};
