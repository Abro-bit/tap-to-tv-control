
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

interface TVPairingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
  deviceName: string;
}

const TVPairingDialog = ({ isOpen, onClose, onSubmit, deviceName }: TVPairingDialogProps) => {
  const [code, setCode] = React.useState("");

  const handleSubmit = () => {
    onSubmit(code);
    setCode("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter TV Pairing Code</DialogTitle>
        </DialogHeader>
        <div className="px-2 py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Please enter the 4-digit code displayed on {deviceName}
          </p>
          <InputOTP
            maxLength={4}
            value={code}
            onChange={(value) => setCode(value)}
            render={({ slots }) => (
              <InputOTPGroup className="gap-2">
                {slots.map((slot, index) => (
                  <InputOTPSlot key={index} index={index} {...slot} />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={code.length !== 4}>
            Pair Device
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TVPairingDialog;
