import * as React from 'react';
import { ObjectShorthandProps, resolveShorthandProps, ShorthandProps, useId } from '@fluentui/react-utilities';
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
   * The tooltip to display on hover or focus. Can be a string, JSX element tree, or TooltipSlotProps.
   */
  tooltip?: ShorthandProps<TooltipSlotProps>;
}

/**
 * Implement tooltip functionality on a component with a tooltip slot.
 */
export function useTooltipSlot(state: React.HTMLAttributes<HTMLElement> & WithTooltipSlot) {
  const managerRef = useTooltipManagerRef();
  const generatedTooltipId = useId('tooltip');

  if (state.tooltip) {
    // To set the tooltip's id, we need to first resolve the shorthand prop.
    state.tooltip = resolveShorthandProps({ tooltip: state.tooltip }, ['tooltip']).tooltip as ObjectShorthandProps<
      TooltipSlotProps
    >;

    const { tooltip, onFocus, onBlur, onPointerEnter, onPointerLeave } = state;

    // Supply the tooltip with a generated ID if it doesn't have one assigned
    if (!tooltip.id) {
      tooltip.id = generatedTooltipId;
    }
    state['aria-describedby'] = tooltip.id;

    state.onFocus = ev => {
      managerRef.current?.show(ev.currentTarget, tooltip);
      onFocus?.(ev);
    };

    state.onPointerEnter = ev => {
      managerRef.current?.show(ev.currentTarget, tooltip);
      onPointerEnter?.(ev);
    };

    state.onBlur = ev => {
      managerRef.current?.hide(ev.currentTarget);
      onBlur?.(ev);
    };

    state.onPointerLeave = ev => {
      managerRef.current?.hide(ev.currentTarget);
      onPointerLeave?.(ev);
    };
  }
}
