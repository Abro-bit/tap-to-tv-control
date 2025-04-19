
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
