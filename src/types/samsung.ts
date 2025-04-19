
export interface SamsungTVDevice {
  id: string;
  name: string;
  ip: string;
  mac?: string;
  token?: string;
  isAvailable: boolean;
}

export type SamsungTVStatus = 'OFF' | 'RUNNING' | 'UNKNOWN';

export interface SamsungTVState {
  powerState: SamsungTVStatus;
  isConnected: boolean;
  volume?: number;
  muted?: boolean;
}
