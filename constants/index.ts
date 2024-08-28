import { homeBtnsStore } from "@/stores/home-btns-store";

export const sidebarLinks = [
  {
    label: "Home",
    route: "/",
    imgUrl: "/icons/home.svg",
  },
  {
    label: "Upcoming",
    route: "/upcoming",
    imgUrl: "/icons/upcoming.svg",
  },
  {
    label: "Public rooms",
    route: "/public-rooms",
    imgUrl: "/icons/public-meetings.svg",
  },
  {
    label: "Recordings",
    route: "/recordings",
    imgUrl: "/icons/recordings.svg",
  },
  {
    label: "Personal room",
    route: "/personal-room",
    imgUrl: "/icons/add-personal.svg",
  },
];

export const homeBtns = [
  {
    bgColor: "bg-orange-1",
    iconUrl: "/icons/add-meeting.svg",
    altText: "Add meeting",
    title: "New meeting",
    description: "Start an instant meeting",
    onClick: () => {
      homeBtnsStore.showStartMeetingModal(true);
    },
  },
  {
    bgColor: "bg-blue-1",
    iconUrl: "/icons/schedule.svg",
    altText: "Schedule meeting",
    title: "Schedule meeting",
    description: "Plan your meeting",
    onClick: () => {
      homeBtnsStore.showScheduleMeetingModal(true);
    },
  },
  {
    bgColor: "bg-yellow-1",
    iconUrl: "/icons/recordings.svg",
    altText: "View recordings",
    title: "View recordings",
    description: "Check out your recordings",
    onClick: () => {
      homeBtnsStore.showViewRecordingsModal(true);
    },
  },
  {
    bgColor: "bg-purple-1",
    iconUrl: "/icons/join-meeting.svg",
    altText: "Join meeting",
    title: "Join meeting",
    description: "Via invitation link",
    onClick: () => {
      homeBtnsStore.showJoinMeetingModal(true);
    },
  },
];
