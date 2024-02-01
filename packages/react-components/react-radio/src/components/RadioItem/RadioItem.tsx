import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useRadioItem_unstable } from './useRadioItem';
import { renderRadioItem_unstable } from './renderRadioItem';
import { useRadioItemStyles_unstable } from './useRadioItemStyles.styles';
import type { RadioItemProps } from './RadioItem.types';

/**
 * RadioItem component - TODO: add more docs
 */
export const RadioItem: ForwardRefComponent<RadioItemProps> = React.forwardRef((props, ref) => {
  const state = useRadioItem_unstable(props, ref);

  useRadioItemStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('useRadioItemStyles_unstable')(state);
  return renderRadioItem_unstable(state);
});

RadioItem.displayName = 'RadioItem';
