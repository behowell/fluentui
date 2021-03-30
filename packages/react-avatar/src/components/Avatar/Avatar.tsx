import { nullRender } from '@fluentui/react-utilities';
import * as React from 'react';

import { Badge } from '../Badge/Badge';
import { AvatarProps } from './Avatar.types';
import { renderAvatar } from './renderAvatar';
import { useAvatar } from './useAvatar';
import { useAvatarStyles } from './useAvatarStyles';

/**
 * An Avatar represents a person or entity.
 * It displays the image, initials, or an icon, and can be either circular or square.
 *
 * {@docCategory Avatar}
 */
export const Avatar = React.forwardRef((props: AvatarProps, ref: React.Ref<HTMLElement>) => {
  const state = useAvatar(props, ref, {
    badge: { as: props.badge ? Badge : nullRender },
  });

  useAvatarStyles(state);

  return renderAvatar(state);
});

Avatar.displayName = 'Avatar';
