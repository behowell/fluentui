import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { GroupProps } from './Group.types';
import { renderGroup_unstable } from './renderGroup';
import { useGroup_unstable } from './useGroup';
import { useGroupStyles_unstable } from './useGroupStyles.styles';
import { useGroupContextValues_unstable } from '../../contexts/useGroupContextValues';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * TODO
 */
export const Group: ForwardRefComponent<GroupProps> = React.forwardRef((props, ref) => {
  const state = useGroup_unstable(props, ref);
  const contextValues = useGroupContextValues_unstable(state);

  useGroupStyles_unstable(state);

  // useCustomStyleHook_unstable('useGroupStyles_unstable')(state);

  return renderGroup_unstable(state, contextValues);
});

Group.displayName = 'Group';
