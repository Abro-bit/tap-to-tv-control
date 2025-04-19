
import { TVProtocol } from '../types/tv';

export const TV_PROTOCOLS: Record<string, TVProtocol> = {
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
