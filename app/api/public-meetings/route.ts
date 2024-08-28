import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const publicMeetings = await db.meetingRoom.findMany({
    where: { isPrivate: { equals: false } },
  });

  return NextResponse.json({ publicMeetings });
};
