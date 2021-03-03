import * as React from 'react';
import { ObjectShorthandProps, ShorthandProps, useId } from '@fluentui/react-utilities';
import { TooltipProps } from '../types';
import { useTooltipManagerRef } from '../components/TooltipProvider';

/**
 * Mixin to add the tooltip slot to a component's Props.
 *
 * Note: The tooltip slot should _not_ be listed in the component's slot props for rendering.
 * Although this has the same API as a slot, the tooltip will not be rendered directly by the component.
 */
export interface WithTooltipSlot {
  /**
   * The tooltip content to display on hover or focus. Can be a string, JSX element tree, or TooltipProps.
   */
  tooltip?: ShorthandProps<TooltipProps>;
}

/**
 * Implement tooltip functionality on a component with a tooltip slot.
 */
export function useTooltipSlot(state: React.HTMLAttributes<HTMLElement> & WithTooltipSlot) {
  const { tooltip } = state;

  const managerRef = useTooltipManagerRef();
  const generatedId = useId('tooltip');

  if (!tooltip) {
    return;
  }

  // Get either the tooltip's current ID if it has one, or a generated ID if not
  const id = (typeof tooltip === 'object' && (tooltip as ObjectShorthandProps<TooltipProps>).id) || generatedId;

  state['aria-describedby'] = id;

  // Create event listeners to show or hide the tooltip.
  // These wrap the existing event handlers and ensure that they are still called.
  const onEnter = <Event extends React.SyntheticEvent<HTMLElement>>(wrappedHandler?: (ev: Event) => void) => {
    return (ev: Event) => {
      wrappedHandler?.(ev);
      if (!ev.isDefaultPrevented()) {
        managerRef.current?.onEnter(ev.currentTarget, tooltip, { id });
      }
    };
  };

  const onLeave = <Event extends React.SyntheticEvent<HTMLElement>>(wrappedHandler?: (ev: Event) => void) => {
    return (ev: Event) => {
      wrappedHandler?.(ev);
      managerRef.current?.onLeave(ev.currentTarget);
    };
  };

  state.onFocus = onEnter(state.onFocus);
  state.onPointerEnter = onEnter(state.onPointerEnter);

  state.onBlur = onLeave(state.onBlur);
  state.onPointerLeave = onLeave(state.onPointerLeave);
}
