import { useState, useEffect } from 'react';
import { TVConnection } from '../services/tvConnection';
import { ConnectionStatus, TVDevice } from '../types/tv';

export function useTVConnection() {
  const [status, setStatus] = useState<ConnectionStatus>(TVConnection.status);
  const [devices, setDevices] = useState<TVDevice[]>(TVConnection.discoveredDevices);
  const [isScanning, setIsScanning] = useState<boolean>(TVConnection.isScanning);
  const [connectedDevice, setConnectedDevice] = useState<TVDevice | null>(TVConnection.connectedDevice);
  const [showPairingDialog, setShowPairingDialog] = useState(false);
  const [pairingDeviceId, setPairingDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const statusUnsubscribe = TVConnection.addStatusListener((newStatus) => {
      setStatus(newStatus);
    });

    const devicesUnsubscribe = TVConnection.addDevicesListener((newDevices) => {
      setDevices(newDevices);
    });

    // Check scan status periodically
    const scanInterval = setInterval(() => {
      setIsScanning(TVConnection.isScanning);
    }, 500);

    // Check connected device periodically
    const deviceInterval = setInterval(() => {
      setConnectedDevice(TVConnection.connectedDevice);
    }, 500);

    return () => {
      statusUnsubscribe();
      devicesUnsubscribe();
      clearInterval(scanInterval);
      clearInterval(deviceInterval);
    };
  }, []);

  const initiateConnection = async (deviceId: string) => {
    const success = await TVConnection.connectToDevice(deviceId);
    if (success) {
      setShowPairingDialog(true);
      setPairingDeviceId(deviceId);
    }
  };

  const verifyPairingCode = async (code: string) => {
    const success = await TVConnection.verifyPairingCode(code);
    if (success) {
      setShowPairingDialog(false);
      setPairingDeviceId(null);
    }
    return success;
  };

  return {
    status,
    devices,
    isScanning,
    connectedDevice,
    showPairingDialog,
    pairingDeviceId,
    startScan: TVConnection.startScan.bind(TVConnection),
    connectToDevice: initiateConnection,
    verifyPairingCode,
    disconnect: TVConnection.disconnect.bind(TVConnection),
    sendCommand: TVConnection.sendCommand.bind(TVConnection)
  };
}
