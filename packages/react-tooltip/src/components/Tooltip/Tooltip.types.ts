import * as React from 'react';
import { ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';
import { TooltipProps } from '../../types';
// import { TooltipProps } from '@fluentui/react-tooltip-provider';

export { TooltipProps };

export const tooltipShorthandProps = [] as const;
export const tooltipSlotProps = [...tooltipShorthandProps, 'arrow'] as const;

export type TooltipState = ComponentState<
  React.Ref<HTMLElement>,
  TooltipProps & {
    /**
     * The arrow that points to the target element.
     */
    arrow?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
  },
  /* ShorthandProps: */ typeof tooltipShorthandProps[number],
  /* DefaultedProps: */ 'arrow' | 'placement' | 'offset'
>;
