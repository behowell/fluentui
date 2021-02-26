import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { TooltipProviderState } from './TooltipProvider.types';
import { tooltipProviderShorthandProps } from './useTooltipProvider';

/**
 * Render the final JSX of TooltipProvider
 * {@docCategory TooltipProvider }
 */
export const renderTooltipProvider = (state: TooltipProviderState) => {
  const { slots, slotProps } = getSlots(state, tooltipProviderShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {/* TODO Add additional slots in the appropritate place */}
      {state.children}
    </slots.root>
  );
};
