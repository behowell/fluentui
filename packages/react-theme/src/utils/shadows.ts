import { ShadowLevelTokens } from '../types';

export function createShadowLevelTokens(ambientColor: string, keyColor: string): ShadowLevelTokens {
  return {
    shadow2: `0 0 2px ${ambientColor}, 0 1px 2px ${keyColor}`,
    shadow4: `0 0 2px ${ambientColor}, 0 2px 4px ${keyColor}`,
    shadow8: `0 0 2px ${ambientColor}, 0 4px 8px ${keyColor}`,
    shadow16: `0 0 2px ${ambientColor}, 0 6px 16px ${keyColor}`,
    shadow28: `0 0 8px ${ambientColor}, 0 14px 28px ${keyColor}`,
    shadow64: `0 0 8px ${ambientColor}, 0 32px 64px ${keyColor}`,

    shadowFilter2: `drop-shadow(0 0 2px ${ambientColor}) drop-shadow(0 1px 2px ${keyColor})`,
    shadowFilter4: `drop-shadow(0 0 2px ${ambientColor}) drop-shadow(0 2px 4px ${keyColor})`,
    shadowFilter8: `drop-shadow(0 0 2px ${ambientColor}) drop-shadow(0 4px 8px ${keyColor})`,
    shadowFilter16: `drop-shadow(0 0 2px ${ambientColor}) drop-shadow(0 6px 16px ${keyColor})`,
    shadowFilter28: `drop-shadow(0 0 8px ${ambientColor}) drop-shadow(0 14px 28px ${keyColor})`,
    shadowFilter64: `drop-shadow(0 0 8px ${ambientColor}) drop-shadow(0 32px 64px ${keyColor})`,
  };
}
