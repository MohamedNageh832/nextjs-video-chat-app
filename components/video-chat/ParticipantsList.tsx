import {
  RoomEvent,
  Track,
  RemoteParticipant,
  ConnectionState,
} from "livekit-client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useRoomContext, useTracks } from "@livekit/components-react";
import { getTrackReferenceId } from "@livekit/components-core";
import { Button } from "../ui/button";
import { ExternalLink, Users } from "lucide-react";
import MinimalControls from "./MinimalControls";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useCallback } from "react";

const ParticipantsList = () => {
  const { user } = useUser();
  const room = useRoomContext();
  const { toast } = useToast();
  const tracks = useTracks([Track.Source.Camera]);

  const handleRoomConnected = useCallback(() => {
    if (!user) return null;
    const strData = JSON.stringify({ profileImg: user.imageUrl });
    const encoder = new TextEncoder();

    const data = encoder.encode(strData);

    room.localParticipant.publishData(data, { reliable: false });
  }, [user, room.localParticipant]);

  const handleParticipantConnected = (participant: RemoteParticipant) => {
    if (participant.isLocal) return;

    toast({
      title: "We have a new member 😃",
      description: `${participant.identity} joined the meeting`,
    });
  };

  const handleParticipantDisconnected = (participant: RemoteParticipant) => {
    if (room.state === ConnectionState.Disconnected) return;

    toast({
      variant: "destructive",
      title: "We lost a member 😢",
      description: `${participant.identity} Left the meeting`,
    });
  };

  room.on(RoomEvent.Connected, handleRoomConnected);
  room.on(RoomEvent.ParticipantConnected, handleParticipantConnected);
  room.on(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected);

  const handleShareLink = () => {};

  return (
    <Sheet>
      <SheetTrigger className="bg-zinc-800">
        <Users />
      </SheetTrigger>
      <SheetContent
        className="flex flex-col justify-between bg-dark-1 text-white border-none"
        side="right"
      >
        <section className="flex flex-col gap-4">
          <SheetTitle className="text-xl font-bold">
            Participants list
          </SheetTitle>

          <Input
            className="placeholder:text-zinc-400 bg-zinc-900 text-white border-none focus-visible:ring-1 focus-visible:ring-offset-1"
            type="search"
            placeholder="Search..."
          />

          <ul>
            {tracks.map((track) => (
              <li
                className="flex-between py-3 text-sm"
                key={getTrackReferenceId(track)}
              >
                {track.participant.identity}

                <MinimalControls track={track} />
              </li>
            ))}
          </ul>
        </section>

        <footer className="flex gap-3">
          <Button
            className="flex items-center gap-2 bg-blue-1 text-sm"
            onClick={handleShareLink}
          >
            <ExternalLink size={20} />
            Copy invitation link
          </Button>
        </footer>
      </SheetContent>
    </Sheet>
  );
};

export default ParticipantsList;
