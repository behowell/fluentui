import { AvatarState, AvatarSizeValue, avatarSizeValues, AvatarTokenSet } from './Avatar.types';

/**
 * Additional state properties needed by Avatar's styling
 */
export interface AvatarStyleProps {
  size?: AvatarSizeValue;
  color?: number;
  tokens?: AvatarTokenSet;
  inactive?: boolean;
  activeRing?: boolean;
  activeShadow?: boolean;
  activeGlow?: boolean;
}

const colorClassCount = 30;

// const colors: { color: string; background: string }[] = [
//   { color: '#004377', background: '#A9D3F2' },
//   { color: '#8F4F00', background: '#FFDDB3' },
//   { color: '#751D20', background: '#F1BBBD' },
//   { color: '#63276D', background: '#E7BFED' },
//   { color: '#00723B', background: '#A8F0CD' },
//   { color: '#7F215D', background: '#F7C0E3' },
//   { color: '#001665', background: '#A3B2E9' },
//   { color: '#563F06', background: '#E0CFA2' },
//   { color: '#6B0042', background: '#ECA5D1' },
//   { color: '#063C06', background: '#9AD39A' },
//   { color: '#00656D', background: '#A6E8ED' },
//   { color: '#712D09', background: '#EFC4AD' },
//   { color: '#835C00', background: '#F9E2AE' },
//   { color: '#403582', background: '#D2CCF8' },
//   { color: '#43002C', background: '#D696C0' },
//   { color: '#333231', background: '#CECCCB' },
//   { color: '#294903', background: '#BDDA9B' },
//   { color: '#00333F', background: '#95C8D4' },
//   { color: '#4D0D56', background: '#DAA7E0' },
//   { color: '#2C3C85', background: '#C7D1FA' },
//   { color: '#420610', background: '#D69BA5' },
//   { color: '#6D5700', background: '#EDDEA6' },
//   { color: '#454241', background: '#D7D5D4' },
//   { color: '#6E0911', background: '#EDACB1' },
//   { color: '#02494C', background: '#9BD9DB' },
//   { color: '#1F2427', background: '#BCC3C7' },
//   { color: '#3A4346', background: '#CDD5D8' },
//   { color: '#002B4F', background: '#9ABFDD' },
//   { color: '#50301A', background: '#DDC3B0' },
//   { color: '#341A51', background: '#C6B1DE' },
// ];

const getColorIndex = (name: string): number => {
  let hash = 0x3f08cd94;
  for (let i = 0; i < name.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = ((hash ^ name.charCodeAt(i)) * 0x01000193) >>> 0; // ">>> 0" converts to an unsigned 32-bit integer
  }
  return hash % colorClassCount;
};

/**
 * Updates Avatar's state object with style-specific properties
 */
export const calcAvatarStyleProps = (state: Readonly<AvatarState>): AvatarStyleProps => {
  const props: AvatarStyleProps = {};

  if (state.customSize) {
    // Make sure the size prop is set to the nearest standard size, when a custom size is used
    props.size = calcSizeClass(state.customSize);
    props.tokens = {
      width: `${state.customSize}px`,
      height: `${state.customSize}px`,
      ...state.tokens,
    };
  }

  if (state.color === 'auto' && state.name) {
    props.color = getColorIndex(state.name);
  }

  if (state.active !== undefined) {
    switch (state.activeDisplay) {
      default:
      case 'ring':
        props.activeRing = true;
        break;
      case 'shadow':
        props.activeShadow = true;
        break;
      case 'glow':
        props.activeGlow = true;
        break;
      case 'ring-shadow':
        props.activeRing = true;
        props.activeShadow = true;
        break;
      case 'ring-glow':
        props.activeRing = true;
        props.activeGlow = true;
        break;
    }

    if (state.active === false) {
      props.inactive = true;
    }
  }

  return props;
};

/**
 * The "size class" of the avatar is the closest AvatarSizeValue that is less-or-equal to the given custom size.
 * This is used in scss style rules to pick the appropriate font size, icon size, etc.
 */
const calcSizeClass = (customSize: number): AvatarSizeValue => {
  // Note: deliberately skipping i = 0 because it's the default return value below
  for (let i = avatarSizeValues.length - 1; i > 0; i--) {
    if (customSize >= avatarSizeValues[i]) {
      return avatarSizeValues[i];
    }
  }

  return avatarSizeValues[0];
};
