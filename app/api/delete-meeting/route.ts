import { db } from "@/lib/db";
import { promiseHandler } from "@/lib/promiseHandler";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { userId, roomId } = await request.json();

  if (!userId || !roomId)
    return NextResponse.json({ success: false, msg: "Insufficient data" });

  const [room, fetchRoomErr] = await promiseHandler(
    db.meetingRoom.findFirst({ where: { id: roomId, ownerId: userId } })
  );

  if (fetchRoomErr)
    return NextResponse.json({ success: false, msg: fetchRoomErr });

  if (!room)
    return NextResponse.json({ success: false, msg: "Room doesn't exist" });

  const [_, err] = await promiseHandler(
    db.meetingRoom.delete({ where: { id: roomId } })
  );

  if (err) return NextResponse.json({ success: false, msg: err });

  const response = { success: true, msg: "User deleted successfully" };

  return NextResponse.json(response);
};
