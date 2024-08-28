import { ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FC, useState } from "react";
import {
  useMediaDevices,
  useMediaDeviceSelect,
  usePersistentUserChoices,
} from "@livekit/components-react";

type MediaDeviceSelectProps = {
  kind: MediaDeviceKind;
};

const MediaDeviceSelect: FC<MediaDeviceSelectProps> = (props) => {
  const { kind } = props;

  const { setActiveMediaDevice } = useMediaDeviceSelect({ kind });

  const mediaDevices = useMediaDevices({ kind });

  const { saveAudioInputDeviceId, saveVideoInputDeviceId } =
    usePersistentUserChoices({ preventSave: false });

  const handleMediaDeviceChange = (deviceId: string) => {
    return () => {
      if (kind === "videoinput") {
        setActiveMediaDevice(deviceId);
        saveVideoInputDeviceId(deviceId);
      } else if (kind === "audioinput") {
        setActiveMediaDevice(deviceId);
        saveAudioInputDeviceId(deviceId);
      }
    };
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ChevronUp />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-3 p-3 rounded-lg bg-dark-1 border border-zinc-700 text-white">
        {mediaDevices.map((device) => (
          <DropdownMenuItem
            onClick={handleMediaDeviceChange(device.deviceId)}
            className="flex w-full p-2 rounded text-xs hover:bg-slate-800"
            key={device.deviceId}
          >
            {device.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MediaDeviceSelect;
