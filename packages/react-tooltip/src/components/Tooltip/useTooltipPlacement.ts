import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import { usePopper } from 'react-popper';
import { TooltipState } from './Tooltip.types';
import { mergeProps } from './useTooltip';
import { arrowHeight } from './useTooltipStyles';

/**
 * Positions the tooltip relative to its targetElement
 */
export const useTooltipPlacement = (state: TooltipState): TooltipState => {
  const [rootElement, setRootElement] = React.useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(null);

  const popper = usePopper(state.targetElement, rootElement, {
    placement: state.placement,
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowElement,
          padding: rootElement ? parseInt(window.getComputedStyle(rootElement).borderRadius, 10) : 0,
        },
      },
      { name: 'offset', options: { offset: [0, arrowHeight] } },
    ],
  });

  mergeProps(state, {
    style: popper.styles.popper,
    placement: popper.attributes.popper?.['data-popper-placement'],
    ref: useMergedRefs(setRootElement, state.ref),
    arrow: {
      style: popper.styles.arrow,
      ref: setArrowElement,
    },
  });

  return state;
};
