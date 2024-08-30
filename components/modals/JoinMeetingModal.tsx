"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { useSnapshot } from "valtio";
import { homeBtnsStore } from "@/stores/home-btns-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { promiseHandler } from "@/lib/promiseHandler";
import { toast } from "../ui/use-toast";
import { cn } from "@/lib/utils";

const JoinMeetingModal = () => {
  const meetingLinkInputRef = useRef<HTMLInputElement | null>(null);
  const { joinMeetingModal, showJoinMeetingModal } = useSnapshot(homeBtnsStore);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const closeModal = () => showJoinMeetingModal(false);

  const handleJoinMeeting = async () => {
    if (!meetingLinkInputRef.current) return;

    const meetingURL = meetingLinkInputRef.current.value;

    const checkRoom = fetch("/api/is-valid-meeting-url", {
      method: "POST",
      body: JSON.stringify({ meetingURL }),
    });

    const [res, err] = await promiseHandler(checkRoom);

    if (err || !res) {
      return toast({
        title: "Error",
        description: "An error occured in the server. Try again later",
        variant: "destructive",
      });
    }

    const { isValid } = await res.json();

    if (!isValid) return setError("Invalid Link");

    setError(null);

    closeModal();
    router.push(meetingURL);
  };

  return (
    <Dialog open={joinMeetingModal.show} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold">
            Join Meeting?
          </DialogTitle>
          <DialogDescription>Paste a meeting link to join</DialogDescription>
        </DialogHeader>

        <section className="flex flex-col gap-3">
          <Input
            className={cn({ "border-red-500": error })}
            type="text"
            ref={meetingLinkInputRef}
            placeholder="Paste the meeting link..."
          />

          {error && <small className="text-red-500">{error}</small>}
        </section>

        <DialogFooter>
          <Button className="w-full bg-blue-1" onClick={handleJoinMeeting}>
            Join
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JoinMeetingModal;
