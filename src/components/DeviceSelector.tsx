
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DeviceSelectorProps {
  currentDevice: string;
  setCurrentDevice: (device: string) => void;
}

const DEVICE_OPTIONS = [
  "Samsung TV",
  "LG TV",
  "Sony TV",
  "Vizio TV",
  "TCL TV",
  "Add New Device"
];

const DeviceSelector = ({ currentDevice, setCurrentDevice }: DeviceSelectorProps) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <span className="text-sm font-medium text-gray-500">Current Device</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600"
          >
            <span className="font-medium">{currentDevice}</span>
            <ChevronDown className="h-4 w-4 text-blue-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {DEVICE_OPTIONS.map((device) => (
            <DropdownMenuItem
              key={device}
              className="flex items-center justify-between"
              onClick={() => {
                if (device === "Add New Device") {
                  // In a real app, navigate to add device screen
                  console.log("Navigate to add device");
                } else {
                  setCurrentDevice(device);
                }
              }}
            >
              <span>{device}</span>
              {currentDevice === device && <Check className="h-4 w-4 ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DeviceSelector;
