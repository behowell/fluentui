import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { tooltipSlotProps, TooltipState } from './Tooltip.types';

/**
 * Render the final JSX of Tooltip
 * {@docCategory Tooltip}
 */
export const renderTooltip = (state: TooltipState) => {
  const { slots, slotProps } = getSlots(state, tooltipSlotProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.arrow {...slotProps.arrow} />
      {state.children}
    </slots.root>
  );
};
