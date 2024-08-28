import { useRouter } from "next/router";
import { proxy } from "valtio";

type HomeBtnsStoreProxy = {
  startMeetingModal: { show: boolean };
  scheduleMeetingModal: { show: boolean };
  viewRecordingsModal: { show: boolean };
  joinMeetingModal: { show: boolean };
  showStartMeetingModal: (show: boolean) => void;
  showScheduleMeetingModal: (show: boolean) => void;
  showViewRecordingsModal: (show: boolean) => void;
  showJoinMeetingModal: (show: boolean) => void;
};

export const homeBtnsStore = proxy<HomeBtnsStoreProxy>({
  startMeetingModal: { show: false },
  scheduleMeetingModal: { show: false },
  viewRecordingsModal: { show: false },
  joinMeetingModal: { show: false },
  showStartMeetingModal: (show) => {
    homeBtnsStore.startMeetingModal.show = show;
  },
  showScheduleMeetingModal: (show) => {
    homeBtnsStore.scheduleMeetingModal.show = show;
  },
  showViewRecordingsModal: (show) => {
    homeBtnsStore.viewRecordingsModal.show = show;
  },
  showJoinMeetingModal: (show) => {
    homeBtnsStore.joinMeetingModal.show = show;
  },
});
