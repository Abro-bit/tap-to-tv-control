
import { useState, useEffect } from 'react';
import { SamsungDiscovery } from '../services/samsungDiscovery';
import { SamsungConnection } from '../services/samsungConnection';
import { SamsungTVDevice, SamsungTVState } from '../types/samsung';

export function useSamsungTV() {
  const [discoveredIPs, setDiscoveredIPs] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [tvState, setTVState] = useState<SamsungTVState>(SamsungConnection.getState());
  const [currentDevice, setCurrentDevice] = useState<SamsungTVDevice | null>(
    SamsungConnection.getCurrentDevice()
  );

  useEffect(() => {
    const discoveryUnsubscribe = SamsungDiscovery.addDiscoveryListener((devices) => {
      setDiscoveredIPs(devices);
      setIsScanning(false);
    });

    const stateUnsubscribe = SamsungConnection.addStateListener((state) => {
      setTVState(state);
      setCurrentDevice(SamsungConnection.getCurrentDevice());
    });

    return () => {
      discoveryUnsubscribe();
      stateUnsubscribe();
    };
  }, []);

  const startScan = async () => {
    setIsScanning(true);
    try {
      await SamsungDiscovery.startScan();
    } catch (error) {
      console.error('Scan failed:', error);
      setIsScanning(false);
    }
  };

  const connect = async (ip: string) => {
    return await SamsungConnection.connect(ip);
  };

  const disconnect = () => {
    SamsungConnection.disconnect();
  };

  const sendCommand = async (command: string) => {
    return await SamsungConnection.sendCommand(command);
  };

  return {
    discoveredIPs,
    isScanning,
    tvState,
    currentDevice,
    startScan,
    connect,
    disconnect,
    sendCommand,
  };
}
