import * as React from 'react';
import { ShorthandProps, useId } from '@fluentui/react-utilities';
import { TooltipSlotProps } from '../TooltipProvider';
import { useTooltipManagerRef } from '../components/TooltipProvider';

/**
 * Mixin to add the tooltip slot to a component's Props.
 *
 * Note: The tooltip slot should _not_ be listed in the component's slot props for rendering.
 * Although this has the same API as a slot, the tooltip will not be rendered directly by the component.
 */
export interface WithTooltipSlot {
  /**
   * The tooltip content to display on hover or focus. Can be a string, JSX element tree, or TooltipSlotProps.
   */
  tooltip?: ShorthandProps<TooltipSlotProps>;
}

/**
 * Implement tooltip functionality on a component with a tooltip slot.
 */
export function useTooltipSlot(state: React.HTMLAttributes<HTMLElement> & WithTooltipSlot) {
  const managerRef = useTooltipManagerRef();
  const generatedId = useId('tooltip');

  if (state.tooltip) {
    const tooltip = state.tooltip;

    // The tooltip needs an ID for aria-describedby. If it does not already have one, use a generated ID
    const id = (tooltip as TooltipSlotProps).id || generatedId;
    state['aria-describedby'] = id;

    // Create event listeners to show or hide the tooltip.
    // These wrap the existing event handlers and ensure that they are still called.
    const showTooltip = <E extends React.SyntheticEvent<HTMLElement>>(wrappedHandler?: (ev: E) => void) => {
      return (ev: E) => {
        wrappedHandler?.(ev);
        if (!ev.isDefaultPrevented()) {
          managerRef.current?.showTooltip(ev.currentTarget, tooltip, { id });
        }
      };
    };

    const hideTooltip = <E extends React.SyntheticEvent<HTMLElement>>(wrappedHandler?: (ev: E) => void) => {
      return (ev: E) => {
        wrappedHandler?.(ev);
        managerRef.current?.hideTooltip(ev.currentTarget);
      };
    };

    state.onFocus = showTooltip(state.onFocus);
    state.onPointerEnter = showTooltip(state.onPointerEnter);

    state.onBlur = hideTooltip(state.onBlur);
    state.onPointerLeave = hideTooltip(state.onPointerLeave);
  }
}
