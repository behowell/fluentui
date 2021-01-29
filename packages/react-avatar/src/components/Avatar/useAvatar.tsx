import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { AvatarProps, defaultAvatarSize, avatarColorCount } from './Avatar.types';
import { useMergedRefs } from '@fluentui/react-hooks';
import { getInitials as defaultGetInitials, nullRender, assertNever } from '@fluentui/utilities';
import { Image } from '../Image/index';
import { ContactIcon as DefaultAvatarIcon } from '@fluentui/react-icons-mdl2';

export const avatarShorthandProps: (keyof AvatarProps)[] = ['label', 'image', 'badge'];

const mergeProps = makeMergeProps({ deepMerge: avatarShorthandProps });

export const useAvatar = (props: AvatarProps, ref: React.Ref<HTMLElement>, defaultProps?: AvatarProps) => {
  const state = mergeProps(
    {
      as: 'span',
      label: { as: 'span' },
      image: { as: props.image ? Image : nullRender },
      badge: { as: nullRender },
      size: defaultAvatarSize,
      getInitials: defaultGetInitials,
      ref: useMergedRefs(ref, React.useRef(null)),
    },
    defaultProps,
    resolveShorthandProps(props, avatarShorthandProps),
  );

  // Add in props used for styling
  if (state.active !== undefined) {
    const activeDisplay: AvatarProps['activeDisplay'] = state.activeDisplay;
    switch (activeDisplay) {
      case undefined:
      case 'ring':
        state.activeRing = true;
        break;
      case 'shadow':
        state.activeShadow = true;
        break;
      case 'glow':
        state.activeGlow = true;
        break;
      case 'ring-shadow':
        state.activeRing = true;
        state.activeShadow = true;
        break;
      case 'ring-glow':
        state.activeRing = true;
        state.activeGlow = true;
        break;
      default:
        assertNever(activeDisplay);
    }
  }

  // If a label was not provided, use the following priority:
  // icon => initials => default icon
  if (!state.label.children) {
    if (state.icon) {
      state.label.children = state.icon;
      state.hasIcon = true;
    } else {
      const initials = state.getInitials(state.name || '', /*isRtl: */ false);
      if (initials) {
        state.label.children = initials;
      } else {
        state.label.children = <DefaultAvatarIcon />;
        state.hasIcon = true;
      }
    }
  }

  if (state.colorVariant === 'colorful') {
    if (typeof state.colorIndex !== 'number') {
      state.colorIndex = getHashCode(state.name);
    }

    state.colorIndex = Math.abs(state.colorIndex) % avatarColorCount;
  }

  return state;
};

// const colorfulPalette: AvatarTokenSet[] = [
//   { background: '#D69BA5', color: '#420610' },
//   { background: '#EDACB1', color: '#6E0911' },
//   { background: '#F1BBBD', color: '#751D20' },
//   { background: '#EFC4AD', color: '#712D09' },
//   { background: '#FFDDB3', color: '#8F4F00' },
//   { background: '#F9E2AE', color: '#835C00' },
//   { background: '#EDDEA6', color: '#6D5700' },
//   { background: '#E0CFA2', color: '#563F06' },
//   { background: '#DDC3B0', color: '#50301A' },
//   { background: '#BDDA9B', color: '#294903' },
//   { background: '#A8F0CD', color: '#00723B' },
//   { background: '#A9D3F2', color: '#004377' },
//   { background: '#9ABFDD', color: '#002B4F' },
//   { background: '#C7D1FA', color: '#2C3C85' },
//   { background: '#A3B2E9', color: '#001665' },
//   { background: '#D2CCF8', color: '#403582' },
//   { background: '#C6B1DE', color: '#341A51' },
//   { background: '#9AD39A', color: '#063C06' },
//   { background: '#A6E8ED', color: '#00656D' },
//   { background: '#DAA7E0', color: '#4D0D56' },
//   { background: '#E7BFED', color: '#63276D' },
//   { background: '#9BD9DB', color: '#02494C' },
//   { background: '#95C8D4', color: '#00333F' },
//   { background: '#F7C0E3', color: '#7F215D' },
//   { background: '#ECA5D1', color: '#6B0042' },
//   { background: '#D696C0', color: '#43002C' },
//   { background: '#D7D5D4', color: '#454241' },
//   { background: '#CECCCB', color: '#333231' },
//   { background: '#CDD5D8', color: '#3A4346' },
//   { background: '#BCC3C7', color: '#1F2427' },
// ];

function getHashCode(name: string | undefined): number {
  if (!name) {
    return 0;
  }

  let hashCode = 0;
  for (let len: number = name.length - 1; len >= 0; len--) {
    const ch = name.charCodeAt(len);
    const shift = len % 8;
    hashCode ^= (ch << shift) + (ch >> (8 - shift)); // eslint-disable-line no-bitwise
  }

  return hashCode;
}
