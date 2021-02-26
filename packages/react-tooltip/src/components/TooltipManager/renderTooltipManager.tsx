import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { TooltipManagerState } from './TooltipManager.types';
import { tooltipManagerShorthandProps } from './useTooltipManager';

/**
 * Render the final JSX of TooltipManager
 * {@docCategory TooltipManager }
 */
export const renderTooltipManager = (state: TooltipManagerState) => {
  const { slots, slotProps } = getSlots(state, tooltipManagerShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {/* TODO Add additional slots in the appropritate place */}
      {state.children}
    </slots.root>
  );
};
