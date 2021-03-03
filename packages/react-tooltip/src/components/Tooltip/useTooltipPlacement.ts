import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import { usePopper } from 'react-popper';
import { TooltipState } from './Tooltip.types';
import { mergeProps } from './useTooltip';
import { arrowHeight, tooltipBorderRadius, tooltipOffset } from './useTooltipStyles';
import { useTheme } from '@fluentui/react-theme-provider';

/**
 * Positions the tooltip relative to its targetElement
 */
export const useTooltipPlacement = (state: TooltipState): TooltipState => {
  const [rootElement, setRootElement] = React.useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(null);

  const theme = useTheme();

  const popper = usePopper(state.targetElement, rootElement, {
    placement: state.placement,
    modifiers: [
      {
        name: 'arrow',
        options: state.noArrow
          ? undefined
          : {
              element: arrowElement,
              padding: parseInt(tooltipBorderRadius(theme), 10),
            },
      },
      { name: 'offset', options: { offset: [0, tooltipOffset + (state.noArrow ? 0 : arrowHeight)] } },
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
