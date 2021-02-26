import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { TooltipProviderState } from './TooltipProvider.types';
import { internal__TooltipProviderContext, tooltipProviderShorthandProps } from './useTooltipProvider';

/**
 * Render the final JSX of TooltipProvider
 * {@docCategory TooltipProvider }
 */
export const renderTooltipProvider = (state: TooltipProviderState) => {
  const { slots, slotProps } = getSlots(state, tooltipProviderShorthandProps);

  return (
    <internal__TooltipProviderContext.Provider value={{ current: undefined }}>
      <slots.root {...slotProps.root} />
    </internal__TooltipProviderContext.Provider>
  );
};
