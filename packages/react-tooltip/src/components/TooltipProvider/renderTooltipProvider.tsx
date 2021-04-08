import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { TooltipProviderState, tooltipProviderShorthandProps } from './TooltipProvider.types';
import { internal__TooltipManagerRefContext, internal__TooltipRendererContext } from './useTooltipProvider';
import { Tooltip } from '../Tooltip/Tooltip';

const TooltipManager = React.lazy(() => import('../TooltipManager/default'));

/**
 * Render the final JSX of TooltipProvider
 * {@docCategory TooltipProvider}
 */
export const renderTooltipProvider = (state: TooltipProviderState) => {
  const { slots, slotProps } = getSlots(state, tooltipProviderShorthandProps);

  return (
    <internal__TooltipManagerRefContext.Provider value={{ current: undefined }}>
      <internal__TooltipRendererContext.Provider value={Tooltip}>
        <slots.root {...slotProps.root} />
        <React.Suspense fallback={null}>
          <TooltipManager />
        </React.Suspense>
      </internal__TooltipRendererContext.Provider>
    </internal__TooltipManagerRefContext.Provider>
  );
};
