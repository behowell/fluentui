/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { TooltipSlots, TooltipState } from './Tooltip.types';

/**
 * Render the final JSX of Tooltip
 */
export const renderTooltip_unstable = (state: TooltipState) => {
  assertSlots<TooltipSlots>(state);

  return (
    <>
      {state.children}
      {state.shouldRenderTooltip && <state.content />}
    </>
  );
};
