/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { Portal } from '@fluentui/react-portal';
import { assertSlots } from '@fluentui/react-utilities';
import type { TooltipContentSlots, TooltipContentState } from './TooltipContent.types';

/**
 * Render the final JSX of TooltipContent
 */
export const renderTooltipContent_unstable = (state: TooltipContentState) => {
  assertSlots<TooltipContentSlots>(state);

  if (!state.shouldRender) {
    return null;
  }

  return (
    <Portal mountNode={state.mountNode}>
      <state.root>
        {state.arrow && <state.arrow />}
        {state.root.children}
      </state.root>
    </Portal>
  );
};
