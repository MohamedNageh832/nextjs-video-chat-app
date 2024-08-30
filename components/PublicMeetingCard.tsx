"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { FC } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

type PublicMeetingCardProps = {
  data: {
    id: string;
    name: string;
    startDateTime: Date;
  };
};

const PublicMeetingCard: FC<PublicMeetingCardProps> = ({ data }) => {
  const { id, name, startDateTime } = data;
  const router = useRouter();

  const time = startDateTime.toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

  const nowTime = new Date();

  const isRunning = nowTime.getTime() > startDateTime.getTime();

  const date = startDateTime.toLocaleDateString("en-US", {
    dateStyle: "long",
  });
  const nowDate = new Date().toLocaleDateString("en-US", { dateStyle: "long" });

  const handleJoinMeeting = () => {
    router.push(`/meeting/${id}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Join {name}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-10">
        <section className="flex items-center gap-2">
          <Calendar size={16} />
          <span className="text-sm">
            Start date:{" "}
            {date === nowDate ? (
              <Badge variant="destructive">Today</Badge>
            ) : (
              <Badge variant="secondary">{date}</Badge>
            )}
          </span>
        </section>
        <section className="flex items-center gap-2">
          <Clock size={16} />
          <span className="text-sm">
            Start time:{" "}
            {isRunning ? (
              <Badge variant="success">is running</Badge>
            ) : (
              <Badge variant="secondary">{time}</Badge>
            )}
          </span>
        </section>
      </CardContent>
      <CardFooter>
        <Button onClick={handleJoinMeeting}>Join meeting</Button>
      </CardFooter>
    </Card>
  );
};

export default PublicMeetingCard;
