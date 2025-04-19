
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';

export function useDevicePlatform() {
  const [isNative, setIsNative] = useState<boolean>(false);
  const [platform, setPlatform] = useState<string>('web');
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    // Determine if running in a native app environment
    const isNativeApp = Capacitor.isNativePlatform();
    setIsNative(isNativeApp);
    
    // Get the current platform
    const currentPlatform = Capacitor.getPlatform();
    setPlatform(currentPlatform);

    // Initial network status
    Network.getStatus().then(status => {
      setIsConnected(status.connected);
      setConnectionType(status.connectionType);
    });

    // Listen for network changes
    const networkListener = Network.addListener('networkStatusChange', status => {
      setIsConnected(status.connected);
      setConnectionType(status.connectionType);
    });

    return () => {
      networkListener.remove();
    };
  }, []);

  return {
    isNative,
    platform,
    isIOS: platform === 'ios',
    isAndroid: platform === 'android',
    isWeb: platform === 'web',
    network: {
      isConnected,
      connectionType,
      isWifi: connectionType === 'wifi'
    }
  };
}
