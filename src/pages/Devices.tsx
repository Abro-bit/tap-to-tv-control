
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, PlusCircle, Edit2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample initial devices (in a real app, this would be stored persistently)
const initialDevices = [
  { id: "1", name: "Samsung TV", brand: "Samsung", model: "Smart TV", room: "Living Room" },
  { id: "2", name: "LG TV", brand: "LG", model: "WebOS", room: "Bedroom" },
];

const Devices = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState(initialDevices);
  const [newDevice, setNewDevice] = useState({ name: "", brand: "Samsung", model: "", room: "" });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddDevice = () => {
    if (newDevice.name && newDevice.model && newDevice.room) {
      setDevices([
        ...devices,
        {
          id: Date.now().toString(),
          name: newDevice.name,
          brand: newDevice.brand,
          model: newDevice.model,
          room: newDevice.room,
        },
      ]);
      setNewDevice({ name: "", brand: "Samsung", model: "", room: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteDevice = (id: string) => {
    setDevices(devices.filter((device) => device.id !== id));
  };

  return (
    <div className="min-h-screen ios-gradient px-4 py-8">
      {/* Header */}
      <header className="flex items-center mb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/")}
          className="mr-3 rounded-full h-10 w-10 bg-white shadow-sm"
        >
          <ArrowLeft className="h-5 w-5 text-blue-500" />
        </Button>
        <h1 className="text-2xl font-semibold text-gray-800">My Devices</h1>
      </header>

      {/* Add Device Button */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            className="w-full mb-6 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 rounded-xl h-12 shadow-sm"
          >
            <PlusCircle className="h-5 w-5" />
            Add New Device
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Device</DialogTitle>
            <DialogDescription>
              Enter the details of your TV to add it to your remote control.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newDevice.name}
                onChange={(e) =>
                  setNewDevice({ ...newDevice, name: e.target.value })
                }
                className="col-span-3"
                placeholder="Living Room TV"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Brand
              </Label>
              <Select
                value={newDevice.brand}
                onValueChange={(value) =>
                  setNewDevice({ ...newDevice, brand: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Samsung">Samsung</SelectItem>
                  <SelectItem value="LG">LG</SelectItem>
                  <SelectItem value="Sony">Sony</SelectItem>
                  <SelectItem value="Vizio">Vizio</SelectItem>
                  <SelectItem value="TCL">TCL</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="model" className="text-right">
                Model
              </Label>
              <Input
                id="model"
                value={newDevice.model}
                onChange={(e) =>
                  setNewDevice({ ...newDevice, model: e.target.value })
                }
                className="col-span-3"
                placeholder="Smart TV 4K"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room" className="text-right">
                Room
              </Label>
              <Input
                id="room"
                value={newDevice.room}
                onChange={(e) =>
                  setNewDevice({ ...newDevice, room: e.target.value })
                }
                className="col-span-3"
                placeholder="Living Room"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddDevice}>Add Device</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Device List */}
      <div className="space-y-4">
        {devices.map((device) => (
          <Card key={device.id} className="p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">{device.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {device.brand} • {device.model}
                </p>
                <div className="mt-1 inline-block px-2 py-0.5 bg-blue-50 rounded-full">
                  <p className="text-xs text-blue-600 font-medium">{device.room}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-10 w-10 border-gray-200"
                >
                  <Edit2 className="h-4 w-4 text-gray-500" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDeleteDevice(device.id)}
                  className="rounded-full h-10 w-10 border-gray-200"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {devices.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No devices added yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Add a device to get started with your universal remote.
          </p>
        </div>
      )}
    </div>
  );
};

export default Devices;
