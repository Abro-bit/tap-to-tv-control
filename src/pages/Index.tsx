import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tv, Power, VolumeX, Volume2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Home, Menu, Settings, ArrowLeft, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RemoteButton from "@/components/RemoteButton";
import DeviceSelector from "@/components/DeviceSelector";
import IOSButton from "@/components/IOSButton";
import AppIcon from "@/components/AppIcon";

const Index = () => {
  const navigate = useNavigate();
  const [currentDevice, setCurrentDevice] = useState("Samsung TV");
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="min-h-screen ios-gradient px-4 py-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">TV Remote</h1>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate("/devices")}
          className="rounded-full h-10 w-10 bg-white shadow-sm"
        >
          <Settings className="h-5 w-5 text-blue-500" />
        </Button>
      </header>
      
      {/* App Icon */}
      <AppIcon />

      {/* Device Selector */}
      <DeviceSelector 
        currentDevice={currentDevice} 
        setCurrentDevice={setCurrentDevice}
      />

      {/* Remote Control */}
      <Card className="mt-6 p-6 mx-auto max-w-xs shadow-md bg-white rounded-3xl">
        <div className="space-y-8">
          {/* Power Section */}
          <div className="flex justify-between items-center">
            <div className="w-10"></div>
            <IOSButton 
              variant="primary" 
              size="lg" 
              className="bg-red-500 hover:bg-red-600"
              onClick={() => console.log("Power")}
            >
              <Power className="h-6 w-6" />
            </IOSButton>
            <div className="w-10"></div>
          </div>

          {/* Volume and Channel Section */}
          <div className="flex justify-between">
            <div className="space-y-4">
              <IOSButton 
                variant="secondary" 
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </IOSButton>
              <div className="flex flex-col gap-2 items-center">
                <IOSButton onClick={() => console.log("Volume Up")}>
                  <ChevronUp className="h-5 w-5" />
                </IOSButton>
                <span className="text-xs text-gray-500 font-medium">VOL</span>
                <IOSButton onClick={() => console.log("Volume Down")}>
                  <ChevronDown className="h-5 w-5" />
                </IOSButton>
              </div>
            </div>

            <div className="space-y-4">
              <IOSButton 
                variant="secondary"
                onClick={() => console.log("Source")}
              >
                <Tv className="h-5 w-5" />
              </IOSButton>
              <div className="flex flex-col gap-2 items-center">
                <IOSButton onClick={() => console.log("Channel Up")}>
                  <ChevronUp className="h-5 w-5" />
                </IOSButton>
                <span className="text-xs text-gray-500 font-medium">CH</span>
                <IOSButton onClick={() => console.log("Channel Down")}>
                  <ChevronDown className="h-5 w-5" />
                </IOSButton>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col items-center gap-3">
            <IOSButton variant="secondary" onClick={() => console.log("Up")}>
              <ChevronUp className="h-5 w-5" />
            </IOSButton>
            <div className="flex items-center gap-3">
              <IOSButton variant="secondary" onClick={() => console.log("Left")}>
                <ChevronLeft className="h-5 w-5" />
              </IOSButton>
              <IOSButton 
                variant="primary"
                size="md"
                onClick={() => console.log("OK")}
              >
                <div className="h-3 w-3 bg-white rounded-full"></div>
              </IOSButton>
              <IOSButton variant="secondary" onClick={() => console.log("Right")}>
                <ChevronRight className="h-5 w-5" />
              </IOSButton>
            </div>
            <IOSButton variant="secondary" onClick={() => console.log("Down")}>
              <ChevronDown className="h-5 w-5" />
            </IOSButton>
          </div>

          {/* Menu Controls */}
          <div className="flex justify-between">
            <IOSButton variant="secondary" onClick={() => console.log("Home")}>
              <Home className="h-5 w-5" />
            </IOSButton>
            <IOSButton variant="secondary" onClick={() => console.log("Menu")}>
              <Menu className="h-5 w-5" />
            </IOSButton>
            <IOSButton variant="secondary" onClick={() => console.log("Back")}>
              <ArrowLeft className="h-5 w-5" />
            </IOSButton>
          </div>

          {/* Number Pad (Simplified) */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <IOSButton
                key={num}
                size="sm"
                variant="default"
                onClick={() => console.log(`Number ${num}`)}
                className="mx-auto text-base font-medium"
              >
                {num}
              </IOSButton>
            ))}
            <div className="col-start-2">
              <IOSButton
                size="sm"
                variant="default"
                onClick={() => console.log(`Number 0`)}
                className="mx-auto text-base font-medium"
              >
                0
              </IOSButton>
            </div>
          </div>

          {/* Streaming Service Buttons */}
          <div className="flex justify-between items-center">
            <IOSButton 
              variant="default"
              className="bg-[#E50914] text-white" // Netflix red
              onClick={() => console.log("Netflix")}
            >
              <span className="text-xs font-bold">Netflix</span>
            </IOSButton>
            <IOSButton 
              variant="default"
              className="bg-[#FF9900] text-white" // Amazon Prime orange
              onClick={() => console.log("Amazon Prime")}
            >
              <span className="text-xs font-bold">Prime</span>
            </IOSButton>
          </div>
        </div>
      </Card>

      <p className="text-center text-gray-500 text-xs mt-8 font-medium">
        Point at your TV and tap buttons to control
      </p>
      <p className="text-center text-blue-500 text-xs mt-1 font-medium">
        Make sure you're within range of your device
      </p>
    </div>
  );
};

export default Index;
