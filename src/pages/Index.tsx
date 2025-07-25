
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tv, Power, VolumeX, Volume2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Home, Menu, Settings, ArrowLeft, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTVConnection } from "@/hooks/useTVConnection";
import { useToast } from "@/hooks/use-toast";
import IOSButton from "@/components/IOSButton";
import AppIcon from "@/components/AppIcon";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { status, connectedDevice, sendCommand, disconnect } = useTVConnection();
  const [isMuted, setIsMuted] = useState(false);

  const handleCommand = async (command: string) => {
    if (status !== 'connected') {
      toast({
        title: "Not Connected",
        description: "Connect to a TV to use the remote",
        variant: "destructive",
      });
      return;
    }
    
    // Handle mute toggle locally
    if (command === 'mute') {
      setIsMuted(!isMuted);
    }
    
    // Send command to TV
    const success = await sendCommand(command as any);
    if (!success) {
      toast({
        title: "Command Failed",
        description: `Could not send ${command} command`,
        variant: "destructive",
      });
    }
  };

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

      {/* Connection Status */}
      <div 
        className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100"
        onClick={() => navigate("/devices")}
      >
        <span className="text-sm font-medium text-gray-500">Current Device</span>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600">
          <div className={`w-2 h-2 rounded-full ${
            status === 'connected' ? 'bg-green-500' : 
            status === 'connecting' ? 'bg-yellow-500' : 
            status === 'error' ? 'bg-red-500' : 'bg-gray-400'
          }`}></div>
          <span className="font-medium text-sm">
            {status === 'connected' ? connectedDevice?.name || 'Unknown TV' : 
             status === 'connecting' ? 'Connecting...' : 
             status === 'error' ? 'Connection Error' : 'Not Connected'}
          </span>
        </div>
      </div>

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
              onClick={() => handleCommand('power')}
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
                onClick={() => handleCommand('mute')}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </IOSButton>
              <div className="flex flex-col gap-2 items-center">
                <IOSButton onClick={() => handleCommand('volumeUp')}>
                  <ChevronUp className="h-5 w-5" />
                </IOSButton>
                <span className="text-xs text-gray-500 font-medium">VOL</span>
                <IOSButton onClick={() => handleCommand('volumeDown')}>
                  <ChevronDown className="h-5 w-5" />
                </IOSButton>
              </div>
            </div>

            <div className="space-y-4">
              <IOSButton 
                variant="secondary"
                onClick={() => navigate("/devices")}
              >
                <Tv className="h-5 w-5" />
              </IOSButton>
              <div className="flex flex-col gap-2 items-center">
                <IOSButton onClick={() => handleCommand('channelUp')}>
                  <ChevronUp className="h-5 w-5" />
                </IOSButton>
                <span className="text-xs text-gray-500 font-medium">CH</span>
                <IOSButton onClick={() => handleCommand('channelDown')}>
                  <ChevronDown className="h-5 w-5" />
                </IOSButton>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="relative flex items-center justify-center w-48 h-48 mx-auto">
            {/* Up segment */}
            <button 
              onClick={() => handleCommand('up')}
              className="absolute w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors overflow-hidden"
              style={{
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: '32px 32px 8px 8px',
                clipPath: 'ellipse(100% 60% at 50% 100%)'
              }}
            >
              <ChevronUp className="h-5 w-5" />
            </button>
            
            {/* Right segment */}
            <button 
              onClick={() => handleCommand('right')}
              className="absolute w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors overflow-hidden"
              style={{
                top: '50%',
                right: '16px',
                transform: 'translateY(-50%)',
                borderRadius: '8px 32px 32px 8px',
                clipPath: 'ellipse(60% 100% at 0% 50%)'
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            {/* Down segment */}
            <button 
              onClick={() => handleCommand('down')}
              className="absolute w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors overflow-hidden"
              style={{
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: '8px 8px 32px 32px',
                clipPath: 'ellipse(100% 60% at 50% 0%)'
              }}
            >
              <ChevronDown className="h-5 w-5" />
            </button>
            
            {/* Left segment */}
            <button 
              onClick={() => handleCommand('left')}
              className="absolute w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors overflow-hidden"
              style={{
                top: '50%',
                left: '16px',
                transform: 'translateY(-50%)',
                borderRadius: '32px 8px 8px 32px',
                clipPath: 'ellipse(60% 100% at 100% 50%)'
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {/* Center OK button */}
            <button 
              onClick={() => handleCommand('ok')}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors z-10"
            >
              OK
            </button>
          </div>

          {/* Menu Controls */}
          <div className="flex justify-between">
            <IOSButton variant="secondary" onClick={() => handleCommand('back')}>
              <ArrowLeft className="h-5 w-5" />
            </IOSButton>
            <IOSButton variant="secondary" onClick={() => handleCommand('home')}>
              <Home className="h-5 w-5" />
            </IOSButton>
            <IOSButton variant="secondary" onClick={() => handleCommand('menu')}>
              <Menu className="h-5 w-5" />
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
              className="bg-[#E50914] text-white px-4 py-2 rounded-none" // Netflix red
              onClick={() => console.log("Netflix")}
            >
              <span className="text-sm font-bold">Netflix</span>
            </IOSButton>
            <IOSButton 
              variant="default"
              className="bg-[#FF9900] text-white px-4 py-2 rounded-none" // Amazon Prime orange
              onClick={() => console.log("Amazon Prime")}
            >
              <span className="text-sm font-bold">Prime</span>
            </IOSButton>
          </div>
        </div>
      </Card>

      <p className="text-center text-gray-500 text-xs mt-8 font-medium">
        {status === 'connected' 
          ? 'Connected and ready to use' 
          : 'Connect to a TV device to use the remote'}
      </p>
      {status === 'connected' && (
        <p className="text-center text-blue-500 text-xs mt-1 font-medium">
          Signal strength: Good
        </p>
      )}
    </div>
  );
};

export default Index;
