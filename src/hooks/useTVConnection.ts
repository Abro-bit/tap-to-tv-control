
import { useState, useEffect } from 'react';
import { TVConnection } from '../services/tvConnection';
import { ConnectionStatus, TVDevice } from '../types/tv';

export function useTVConnection() {
  const [status, setStatus] = useState<ConnectionStatus>(TVConnection.status);
  const [devices, setDevices] = useState<TVDevice[]>(TVConnection.discoveredDevices);
  const [isScanning, setIsScanning] = useState<boolean>(TVConnection.isScanning);
  const [connectedDevice, setConnectedDevice] = useState<TVDevice | null>(TVConnection.connectedDevice);

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

  return {
    status,
    devices,
    isScanning,
    connectedDevice,
    startScan: TVConnection.startScan.bind(TVConnection),
    connectToDevice: TVConnection.connectToDevice.bind(TVConnection),
    disconnect: TVConnection.disconnect.bind(TVConnection),
    sendCommand: TVConnection.sendCommand.bind(TVConnection)
  };
}
