
import { Network } from '@capacitor/network';
import { ConnectionStatus, TVDevice } from '../../types/tv';

export class BaseConnectionService {
  protected _status: ConnectionStatus = 'disconnected';
  protected _discoveredDevices: TVDevice[] = [];
  protected _connectedDevice: TVDevice | null = null;
  protected _statusListeners: ((status: ConnectionStatus) => void)[] = [];
  protected _devicesListeners: ((devices: TVDevice[]) => void)[] = [];

  constructor() {
    Network.addListener('networkStatusChange', status => {
      if (!status.connected && this._status === 'connected') {
        this.updateStatus('disconnected');
      }
    });
  }

  protected updateStatus(status: ConnectionStatus): void {
    this._status = status;
    this._statusListeners.forEach(callback => callback(status));
  }

  protected updateDevices(): void {
    this._devicesListeners.forEach(callback => callback(this._discoveredDevices));
  }

  public addStatusListener(callback: (status: ConnectionStatus) => void): () => void {
    this._statusListeners.push(callback);
    return () => {
      this._statusListeners = this._statusListeners.filter(cb => cb !== callback);
    };
  }

  public addDevicesListener(callback: (devices: TVDevice[]) => void): () => void {
    this._devicesListeners.push(callback);
    callback(this._discoveredDevices);
    return () => {
      this._devicesListeners = this._devicesListeners.filter(cb => cb !== callback);
    };
  }
}
