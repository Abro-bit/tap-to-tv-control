
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Tv } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTVConnection } from "@/hooks/useTVConnection";
import { useToast } from "@/hooks/use-toast";

const Devices = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    devices, 
    isScanning, 
    startScan, 
    connectToDevice,
    connectedDevice,
    status
  } = useTVConnection();

  const handleConnectDevice = async (deviceId: string) => {
    const success = await connectToDevice(deviceId);
    if (success) {
      toast({
        title: "Connected",
        description: "Successfully connected to TV",
      });
      navigate('/');
    } else {
      toast({
        title: "Connection Failed",
        description: "Could not connect to the TV",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen ios-gradient px-4 py-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate("/")}
          className="rounded-full h-10 w-10 bg-white shadow-sm"
        >
          <ArrowLeft className="h-5 w-5 text-blue-500" />
        </Button>
        <h1 className="text-2xl font-semibold text-gray-800">TV Devices</h1>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => startScan()}
          disabled={isScanning}
          className="rounded-full h-10 w-10 bg-white shadow-sm"
        >
          <RefreshCw className={`h-5 w-5 text-blue-500 ${isScanning ? 'animate-spin' : ''}`} />
        </Button>
      </header>

      {/* Connection Status */}
      <div className="mb-6">
        <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
          <div className={`w-3 h-3 rounded-full ${
            status === 'connected' ? 'bg-green-500' : 
            status === 'connecting' ? 'bg-yellow-500' : 
            status === 'error' ? 'bg-red-500' : 'bg-gray-400'
          }`}></div>
          <span className="text-sm font-medium text-gray-700">
            {status === 'connected' ? 'Connected to ' + connectedDevice?.name : 
             status === 'connecting' ? 'Connecting...' : 
             status === 'error' ? 'Connection Error' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Scan Status */}
      {isScanning && (
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium flex items-center">
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Scanning for devices...
          </div>
        </div>
      )}

      {/* Device List */}
      <div className="space-y-3">
        {devices.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No devices found</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => startScan()}
              disabled={isScanning}
            >
              Scan for Devices
            </Button>
          </div>
        ) : (
          devices.map((device) => (
            <Card key={device.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Tv className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base font-medium">{device.name}</h3>
                  <p className="text-xs text-gray-500">{device.ipAddress}</p>
                </div>
              </div>
              <Button 
                size="sm" 
                onClick={() => handleConnectDevice(device.id)}
                variant={connectedDevice?.id === device.id ? "default" : "outline"}
              >
                {connectedDevice?.id === device.id ? "Connected" : "Connect"}
              </Button>
            </Card>
          ))
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Make sure your TV and phone are on the same WiFi network
        </p>
      </div>
    </div>
  );
};

export default Devices;
