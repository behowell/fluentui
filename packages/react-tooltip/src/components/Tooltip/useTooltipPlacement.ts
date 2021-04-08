import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import { usePopper } from 'react-popper';
import { TooltipState } from './Tooltip.types';
import { mergeProps } from './useTooltip';
import { arrowHeight, tooltipBorderRadius } from './useTooltipStyles';
import { useTheme } from '@fluentui/react-theme-provider';
import { TooltipPlacement } from '../../types/TooltipProps';
import { useFluent } from '@fluentui/react-provider';

const expectNever = (_: never) => {
  //
};

const toPopperPlacement = (placement: TooltipPlacement, rtl: boolean) => {
  switch (placement) {
    case 'above':
      return 'top';
    case 'above-start':
      return rtl ? 'top-end' : 'top-start';
    case 'above-end':
      return rtl ? 'top-start' : 'top-end';

    case 'below':
      return 'bottom';
    case 'below-start':
      return rtl ? 'bottom-end' : 'bottom-start';
    case 'below-end':
      return rtl ? 'bottom-start' : 'bottom-end';

    case 'before':
      return rtl ? 'right' : 'left';
    case 'before-top':
      return rtl ? 'right-start' : 'left-start';
    case 'before-bottom':
      return rtl ? 'right-end' : 'left-end';

    case 'after':
      return rtl ? 'left' : 'right';
    case 'after-top':
      return rtl ? 'left-start' : 'right-start';
    case 'after-bottom':
      return rtl ? 'left-end' : 'right-end';

    default:
      expectNever(placement);
      return 'top';
  }
};

/**
 * Positions the tooltip relative to its targetElement
 */
export const useTooltipPlacement = (state: TooltipState): TooltipState => {
  const [rootElement, setRootElement] = React.useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(null);

  const theme = useTheme();
  console.log('brandbackground: ', theme.alias.color.brand.brandBackground);

  const popper = usePopper(state.targetElement, rootElement, {
    placement: toPopperPlacement(state.placement, useFluent().dir === 'rtl'),
    modifiers: [
      {
        name: 'arrow',
        options: state.noArrow
          ? undefined
          : {
              element: arrowElement,
              padding: 2 * parseInt(tooltipBorderRadius(theme), 10),
            },
      },
      { name: 'offset', options: { offset: [0, state.offset + (state.noArrow ? 0 : arrowHeight)] } },
    ],
  });

  mergeProps(state, {
    style: state.targetElement && popper.styles.popper,
    placement: popper.attributes.popper?.['data-popper-placement'],
    ref: useMergedRefs(setRootElement, state.ref),
    arrow: {
      style: state.targetElement && popper.styles.arrow,
      ref: setArrowElement,
    },
  });

  return state;
};
