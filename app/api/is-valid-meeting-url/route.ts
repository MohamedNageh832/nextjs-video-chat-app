import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { meetingURL } = await request.json();

  if (!meetingURL.includes("meeting")) {
    return NextResponse.json({ isValid: false });
  }

  const linkParts = meetingURL.split("/");
  const meetingId = linkParts[linkParts.length - 1];

  const meetingRoom = await db.meetingRoom.findFirst({
    where: { id: meetingId },
  });

  return NextResponse.json({ isValid: meetingRoom && meetingRoom.id });
};
