
import { Network } from '@capacitor/network';
import { TVDevice, ConnectionStatus, TVProtocol } from '../types/tv';
import { TV_PROTOCOLS } from '../constants/tvProtocols';
import { BaseConnectionService } from './base/BaseConnectionService';

class TVConnectionService extends BaseConnectionService {
  private static instance: TVConnectionService;
  private _isScanning = false;
  private _currentPairingCode: string | null = null;
  private _deviceAwaitingPairing: TVDevice | null = null;

  private constructor() {
    super();
    
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

  public async startScan(): Promise<void> {
    if (this._isScanning) return;
    
    const status = await Network.getStatus();
    if (!status.connected) {
      console.error('Network is not connected. Cannot scan for devices.');
      return;
    }
    
    this._isScanning = true;
    console.log('Started scanning for TV devices...');
    
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

    // Generate a mock pairing code that would normally come from the TV
    const mockPairingCode = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(`Pairing code displayed on TV: ${mockPairingCode}`);

    // Store the code temporarily (in a real implementation, this would be handled differently)
    this._currentPairingCode = mockPairingCode;
    this._deviceAwaitingPairing = device;

    return true;
  }

  public async verifyPairingCode(code: string): Promise<boolean> {
    if (!this._deviceAwaitingPairing || !this._currentPairingCode) {
      console.error('No device is awaiting pairing');
      return false;
    }

    if (code !== this._currentPairingCode) {
      console.error('Invalid pairing code');
      this.updateStatus('disconnected');
      return false;
    }

    // Successful pairing
    this._connectedDevice = this._deviceAwaitingPairing;
    this.updateStatus('connected');
    console.log(`Successfully paired with ${this._connectedDevice.name}`);

    // Clear temporary pairing data
    this._currentPairingCode = null;
    this._deviceAwaitingPairing = null;

    return true;
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
    console.log(`Sending command ${String(commandType)} (${command}) to ${this._connectedDevice.name}`);
    
    return true;
  }
}

export const TVConnection = TVConnectionService.getInstance();
