
import { Network } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';

/**
 * Helper functions for iOS-specific functionality
 */
export const iOSHelper = {
  /**
   * Checks if the app is running on an iOS device
   */
  isIOS: (): boolean => {
    return Capacitor.getPlatform() === 'ios';
  },

  /**
   * Gets network connection information with iOS-specific handling
   */
  getNetworkInfo: async (): Promise<{
    connected: boolean;
    connectionType: string;
    isWifi: boolean;
  }> => {
    try {
      const status = await Network.getStatus();
      return {
        connected: status.connected,
        connectionType: status.connectionType,
        isWifi: status.connectionType === 'wifi'
      };
    } catch (error) {
      console.error('Failed to get network status:', error);
      return {
        connected: false,
        connectionType: 'none',
        isWifi: false
      };
    }
  },

  /**
   * Checks if the device has WiFi enabled, which is required for TV discovery
   */
  hasWifiForTVDiscovery: async (): Promise<boolean> => {
    const networkInfo = await iOSHelper.getNetworkInfo();
    return networkInfo.connected && networkInfo.isWifi;
  }
};
