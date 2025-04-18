
import { Network } from '@capacitor/network';

// TV Connection states
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

// Different TV brands and their command protocols
export interface TVProtocol {
  name: string;
  commands: {
    power: string;
    volumeUp: string;
    volumeDown: string;
    channelUp: string;
    channelDown: string;
    mute: string;
    home: string;
    menu: string;
    ok: string;
    back: string;
    up: string;
    down: string;
    left: string;
    right: string;
  };
}

// TV Device representation
export interface TVDevice {
  id: string;
  name: string;
  brand: string;
  ipAddress?: string;
  protocol: TVProtocol;
}

// Available TV Protocols
const TV_PROTOCOLS: Record<string, TVProtocol> = {
  samsung: {
    name: 'Samsung',
    commands: {
      power: 'KEY_POWER',
      volumeUp: 'KEY_VOLUP',
      volumeDown: 'KEY_VOLDOWN',
      channelUp: 'KEY_CHUP',
      channelDown: 'KEY_CHDOWN',
      mute: 'KEY_MUTE',
      home: 'KEY_HOME',
      menu: 'KEY_MENU',
      ok: 'KEY_ENTER',
      back: 'KEY_RETURN',
      up: 'KEY_UP',
      down: 'KEY_DOWN',
      left: 'KEY_LEFT',
      right: 'KEY_RIGHT',
    }
  },
  lg: {
    name: 'LG',
    commands: {
      power: 'POWER',
      volumeUp: 'VOLUME_UP',
      volumeDown: 'VOLUME_DOWN',
      channelUp: 'CHANNEL_UP',
      channelDown: 'CHANNEL_DOWN',
      mute: 'MUTE',
      home: 'HOME',
      menu: 'MENU',
      ok: 'OK',
      back: 'BACK',
      up: 'UP',
      down: 'DOWN',
      left: 'LEFT',
      right: 'RIGHT',
    }
  },
  sony: {
    name: 'Sony',
    commands: {
      power: 'AAAAAQAAAAEAAAAVAw==',
      volumeUp: 'AAAAAQAAAAEAAAASAw==',
      volumeDown: 'AAAAAQAAAAEAAAATAw==',
      channelUp: 'AAAAAQAAAAEAAAAQAw==',
      channelDown: 'AAAAAQAAAAEAAAARAw==',
      mute: 'AAAAAQAAAAEAAAAUAw==',
      home: 'AAAAAQAAAAEAAABgAw==',
      menu: 'AAAAAQAAAAEAAABgAw==',
      ok: 'AAAAAQAAAAEAAABlAw==',
      back: 'AAAAAgAAAJcAAAAjAw==',
      up: 'AAAAAQAAAAEAAAB0Aw==',
      down: 'AAAAAQAAAAEAAAB1Aw==',
      left: 'AAAAAQAAAAEAAAA2Aw==',
      right: 'AAAAAQAAAAEAAAAzAw==',
    }
  }
};

// Singleton pattern for TV connection service
class TVConnectionService {
  private static instance: TVConnectionService;
  private _status: ConnectionStatus = 'disconnected';
  private _discoveredDevices: TVDevice[] = [];
  private _connectedDevice: TVDevice | null = null;
  private _statusListeners: ((status: ConnectionStatus) => void)[] = [];
  private _devicesListeners: ((devices: TVDevice[]) => void)[] = [];
  private _isScanning = false;

  private constructor() {
    // Initialize network status listener
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed:', status);
      // If network goes down, update connection status
      if (!status.connected && this._status === 'connected') {
        this.updateStatus('disconnected');
      }
    });

    // Demo devices for testing
    this._discoveredDevices = [
      {
        id: 'samsung-tv-1',
        name: 'Samsung TV (Living Room)',
        brand: 'samsung',
        ipAddress: '192.168.1.101',
        protocol: TV_PROTOCOLS.samsung
      },
      {
        id: 'lg-tv-1',
        name: 'LG TV (Bedroom)',
        brand: 'lg',
        ipAddress: '192.168.1.102',
        protocol: TV_PROTOCOLS.lg
      },
      {
        id: 'sony-tv-1',
        name: 'Sony Bravia (Office)',
        brand: 'sony',
        ipAddress: '192.168.1.103',
        protocol: TV_PROTOCOLS.sony
      }
    ];
  }

  public static getInstance(): TVConnectionService {
    if (!TVConnectionService.instance) {
      TVConnectionService.instance = new TVConnectionService();
    }
    return TVConnectionService.instance;
  }

  public get status(): ConnectionStatus {
    return this._status;
  }

  public get discoveredDevices(): TVDevice[] {
    return this._discoveredDevices;
  }

  public get connectedDevice(): TVDevice | null {
    return this._connectedDevice;
  }

  public get isScanning(): boolean {
    return this._isScanning;
  }

  public addStatusListener(callback: (status: ConnectionStatus) => void): () => void {
    this._statusListeners.push(callback);
    return () => {
      this._statusListeners = this._statusListeners.filter(cb => cb !== callback);
    };
  }

  public addDevicesListener(callback: (devices: TVDevice[]) => void): () => void {
    this._devicesListeners.push(callback);
    callback(this._discoveredDevices); // Initial callback with current devices
    return () => {
      this._devicesListeners = this._devicesListeners.filter(cb => cb !== callback);
    };
  }

  private updateStatus(status: ConnectionStatus): void {
    this._status = status;
    this._statusListeners.forEach(callback => callback(status));
  }

  private updateDevices(): void {
    this._devicesListeners.forEach(callback => callback(this._discoveredDevices));
  }

  public async startScan(): Promise<void> {
    if (this._isScanning) return;
    
    // Check if network is available
    const status = await Network.getStatus();
    if (!status.connected) {
      console.error('Network is not connected. Cannot scan for devices.');
      return;
    }
    
    this._isScanning = true;
    console.log('Started scanning for TV devices...');
    
    // For demo, we'll just use our pre-defined devices
    // In a real implementation, this would be where you'd scan the network
    
    // Simulate scanning delay
    setTimeout(() => {
      this._isScanning = false;
      this.updateDevices();
      console.log('Scan completed. Found', this._discoveredDevices.length, 'devices');
    }, 2000);
  }

  public async connectToDevice(deviceId: string): Promise<boolean> {
    const device = this._discoveredDevices.find(d => d.id === deviceId);
    if (!device) {
      console.error(`Device with ID ${deviceId} not found`);
      return false;
    }

    this.updateStatus('connecting');
    console.log(`Connecting to ${device.name} at ${device.ipAddress}...`);

    // Simulate connection process
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        this._connectedDevice = device;
        this.updateStatus('connected');
        console.log(`Connected to ${device.name}`);
        resolve(true);
      }, 1500);
    });
  }

  public async disconnect(): Promise<void> {
    if (this._status !== 'connected') return;
    
    this.updateStatus('disconnected');
    console.log(`Disconnected from ${this._connectedDevice?.name}`);
    this._connectedDevice = null;
  }

  public async sendCommand(commandType: keyof TVProtocol['commands']): Promise<boolean> {
    if (!this._connectedDevice || this._status !== 'connected') {
      console.error('Not connected to a device');
      return false;
    }

    const command = this._connectedDevice.protocol.commands[commandType];
    console.log(`Sending command ${commandType} (${command}) to ${this._connectedDevice.name}`);
    
    // Simulate command sending
    // In a real app, this would send the command via WebSocket or HTTP
    return true;
  }
}

export const TVConnection = TVConnectionService.getInstance();
