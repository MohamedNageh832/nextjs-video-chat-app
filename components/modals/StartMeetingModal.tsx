"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSnapshot } from "valtio";
import { homeBtnsStore } from "@/stores/home-btns-store";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { promiseHandler } from "@/lib/promiseHandler";
import { toast } from "../ui/use-toast";

const StartMeetingModal = () => {
  const router = useRouter();
  const { user } = useUser();
  const homeStore = useSnapshot(homeBtnsStore);

  const handleStartMeeting = async () => {
    if (!user) return;
    const name = `${user.firstName} ${user.lastName}`;

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({ name, userId: user.id }),
    };

    const [res, err] = await promiseHandler(
      fetch("/api/create-meeting", fetchOptions)
    );

    if (err || !res)
      return toast({
        title: "An error occured",
        variant: "destructive",
        description: `${err}`,
      });

    console.log(res);

    const data = await res.json();

    const { roomId } = data;

    router.push(`/meeting/${roomId}`);
  };

  const handleClose = () => homeStore.showStartMeetingModal(false);

  return (
    <Dialog open={homeStore.startMeetingModal.show} onOpenChange={handleClose}>
      <DialogContent className="flex flex-col bg-dark-1 text-white border-none">
        <DialogTitle className="text-3xl">Start new meeting?</DialogTitle>

        <DialogFooter className="block">
          <Button className="w-full bg-blue-1" onClick={handleStartMeeting}>
            Start meeting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StartMeetingModal;
