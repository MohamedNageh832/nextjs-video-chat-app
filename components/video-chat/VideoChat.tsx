import { Track } from "livekit-client";
import { getTrackReferenceId, isLocal } from "@livekit/components-core";
import {
  useTracks,
  VideoTrack,
  RoomAudioRenderer,
} from "@livekit/components-react";
import MeetingParticipant from "./MeetingParticipant";
import { cn } from "@/lib/utils";
import MeetingControls from "./MeetingControls";

function VideoChat() {
  const cameraTracks = useTracks([Track.Source.Camera]);

  const screenShareTracks = useTracks([
    Track.Source.ScreenShare,
    Track.Source.ScreenShareAudio,
  ]);

  const localTrack = cameraTracks.filter(
    (track) => track.participant.isLocal
  )[0];

  return (
    <section className="flex-center flex-col gap-10 min-h-screen p-10">
      <section className="flex-center flex-wrap gap-10 size-full text-white">
        <RoomAudioRenderer />

        {screenShareTracks.length > 0 && (
          <section
            className={cn(
              `grid gap-10 grid-cols-${screenShareTracks.length} w-full`,
              {
                "w-[800px] flex-grow": screenShareTracks.length === 1,
              }
            )}
          >
            {screenShareTracks.map((track) => (
              <section
                className="size-full self-start aspect-video bg-black rounded-xl"
                key={getTrackReferenceId(track)}
              >
                <VideoTrack trackRef={track} />
              </section>
            ))}
          </section>
        )}

        <section
          className={cn("flex-center flex-wrap gap-10 min-w-72", {
            "flex-1": screenShareTracks.length === 1,
          })}
        >
          {localTrack && <MeetingParticipant track={localTrack} />}

          {cameraTracks.map(
            (track, i) =>
              !isLocal(track.participant) && (
                <MeetingParticipant
                  key={getTrackReferenceId(track)}
                  track={track}
                />
              )
          )}
        </section>
      </section>

      <MeetingControls track={localTrack} />
    </section>
  );
}

export default VideoChat;
