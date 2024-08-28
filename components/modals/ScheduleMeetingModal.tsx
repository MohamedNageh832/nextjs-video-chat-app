import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSnapshot } from "valtio";
import { homeBtnsStore } from "@/stores/home-btns-store";

const ScheduleMeetingModal = () => {
  const homeStore = useSnapshot(homeBtnsStore);

  const handleClose = () => homeStore.showScheduleMeetingModal(false);

  return (
    <Dialog
      open={homeStore.scheduleMeetingModal.show}
      onOpenChange={handleClose}
    >
      <DialogContent className="flex flex-col bg-dark-1 text-white border-none">
        <DialogTitle className="text-3xl">Start new meeting?</DialogTitle>

        <DialogFooter className="block">
          <Button className="w-full bg-blue-1">Start meeting</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeetingModal;
