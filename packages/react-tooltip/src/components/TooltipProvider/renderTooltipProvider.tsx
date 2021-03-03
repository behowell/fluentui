import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { TooltipProviderState, tooltipProviderShorthandProps } from './TooltipProvider.types';
import { internal__TooltipProviderContext } from './useTooltipProvider';

const TooltipManager = React.lazy(() => import('../TooltipManager/default'));

/**
 * Render the final JSX of TooltipProvider
 * {@docCategory TooltipProvider}
 */
export const renderTooltipProvider = (state: TooltipProviderState) => {
  const { slots, slotProps } = getSlots(state, tooltipProviderShorthandProps);

  return (
    <internal__TooltipProviderContext.Provider value={{ current: undefined }}>
      <slots.root {...slotProps.root} />
      <React.Suspense fallback={null}>
        <TooltipManager />
      </React.Suspense>
    </internal__TooltipProviderContext.Provider>
  );
};
