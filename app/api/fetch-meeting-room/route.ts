import { db } from "@/lib/db";
import { promiseHandler } from "@/lib/promiseHandler";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { roomId } = await request.json();

  const [room, err] = await promiseHandler(
    db.meetingRoom.findFirst({ where: { id: roomId } })
  );

  if (err) return NextResponse.json({ success: false, msg: `${err}` });

  return NextResponse.json(room);
};
