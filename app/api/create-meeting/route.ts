import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { name, userId } = await request.json();

  await db.meetingRoom.create({
    data: { name: `${name}'s Room`, ownerId: userId },
  });

  const meetingRooms = await db.meetingRoom.findMany({
    where: { ownerId: { equals: userId } },
  });

  const closestMeetings = meetingRooms.sort(
    (a, b) => a.startDateTime.getTime() - b.startDateTime.getTime()
  );

  const roomId = closestMeetings[0].id;

  return NextResponse.json({ roomId });
};
