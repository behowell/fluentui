import * as React from 'react';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { RadioItemProps } from './RadioItem.types';
import { renderRadioItem_unstable } from './renderRadioItem';
import { useRadioItem_unstable } from './useRadioItem';
import { useRadioItemStyles_unstable } from './useRadioItemStyles.styles';

/**
 * RadioItem component is a wrapper for a radio button with a label.
 */
export const RadioItem: ForwardRefComponent<RadioItemProps> = React.forwardRef((props, ref) => {
  const state = useRadioItem_unstable(props, ref);

  useRadioItemStyles_unstable(state);
  useCustomStyleHook_unstable('useRadioItemStyles_unstable')(state);

  return renderRadioItem_unstable(state);
});

RadioItem.displayName = 'RadioItem';
