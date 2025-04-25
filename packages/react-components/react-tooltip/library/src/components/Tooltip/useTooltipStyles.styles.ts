import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { TooltipSlots, TooltipState } from './Tooltip.types';

export const tooltipClassNames: SlotClassNames<TooltipSlots> = {
  content: 'fui-Tooltip__content',
};

/**
 * Apply styling to the Tooltip slots based on the state
 */
export const useTooltipStyles_unstable = (state: TooltipState): TooltipState => {
  'use no memo';

  state.content.className = mergeClasses(tooltipClassNames.content, state.content.className);

  return state;
};
