import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { resolveShorthandProp, ShorthandProps, useId } from '@fluentui/react-utilities';
import { TooltipProps } from '../types';
import { useTooltipManagerRef, useTooltipRenderer } from '../components/TooltipProvider';

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
  const managerRef = useTooltipManagerRef();
  const renderTooltip = useTooltipRenderer();
  const generatedId = useId('tooltip');
  const tooltipRef = React.useRef<HTMLElement>(null);

  if (state.tooltip) {
    if (!renderTooltip) {
      console.error("Trying to render a tooltip, but there's no TooltipProvider!");
      return;
    }

    // Resolve the tooltip shorthand props, which will let us add a generated ID to the tooltip for aria
    const tooltipProps = resolveShorthandProp(state.tooltip);

    tooltipProps.id = tooltipProps.id || generatedId;

    state.tooltip = tooltipProps;
    state['aria-describedby'] = tooltipProps.id;

    ReactDOM.createPortal(renderTooltip({ ...tooltipProps, ref: tooltipRef }), document.body);

    // Create event listeners to show or hide the tooltip.
    // These wrap the existing event handlers and ensure that they are still called.
    const showTooltipHandler = <Event extends React.SyntheticEvent<HTMLElement>>(onEvent?: (ev: Event) => void) => {
      return (ev: Event) => {
        onEvent?.(ev);
        if (!ev.isDefaultPrevented()) {
          managerRef.current?.showTooltip(ev.currentTarget, tooltipProps);
        }
      };
    };

    const hideTooltipHandler = <Event extends React.SyntheticEvent<HTMLElement>>(onEvent?: (ev: Event) => void) => {
      return (ev: Event) => {
        onEvent?.(ev);
        managerRef.current?.hideTooltip(ev.currentTarget);
      };
    };

    state.onFocus = showTooltipHandler(state.onFocus);
    state.onPointerEnter = showTooltipHandler(state.onPointerEnter);

    state.onBlur = hideTooltipHandler(state.onBlur);
    state.onPointerLeave = hideTooltipHandler(state.onPointerLeave);
  }
}
