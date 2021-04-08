import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import { usePopper } from 'react-popper';
import { Placement as PopperPlacement } from '@popperjs/core';
import { TooltipState } from './Tooltip.types';
import { mergeProps } from './useTooltip';
import { arrowHeight, tooltipBorderRadius } from './useTooltipStyles';
import { useTheme } from '@fluentui/react-theme-provider';
import { TooltipPlacement } from '../../types/TooltipProps';
import { useFluent } from '@fluentui/react-provider';

const expectNever = (_: never) => {
  //
};

export const toPopperPlacement = (placement: TooltipPlacement, rtl: boolean): PopperPlacement => {
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

export const toTooltipPlacement = (popperPlacement: PopperPlacement, rtl: boolean): TooltipPlacement => {
  switch (popperPlacement) {
    case 'top':
      return 'above';
    case 'top-start':
      return rtl ? 'above-end' : 'above-start';
    case 'top-end':
      return rtl ? 'above-start' : 'above-end';

    case 'bottom':
      return 'below';
    case 'bottom-start':
      return rtl ? 'below-end' : 'below-start';
    case 'bottom-end':
      return rtl ? 'below-start' : 'below-end';

    case 'right':
      return rtl ? 'before' : 'after';
    case 'right-start':
      return rtl ? 'before-top' : 'after-top';
    case 'right-end':
      return rtl ? 'before-bottom' : 'after-bottom';

    case 'left':
      return rtl ? 'after' : 'before';
    case 'left-start':
      return rtl ? 'after-top' : 'before-top';
    case 'left-end':
      return rtl ? 'after-bottom' : 'before-bottom';

    default:
      return 'above';
  }
};

/**
 * Positions the tooltip relative to its targetElement
 */
export const useTooltipPlacement = (state: TooltipState): TooltipState => {
  const [rootElement, setRootElement] = React.useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(null);

  const rtl = useFluent().dir === 'rtl';

  const theme = useTheme();
  console.log('brandbackground: ', theme.alias.color.brand.brandBackground);

  const popper = usePopper(state.targetElement, rootElement, {
    placement: toPopperPlacement(state.placement, rtl),
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
    style: state.targetElement ? popper.styles.popper : undefined,
    placement: popper.attributes.popper
      ? toTooltipPlacement(popper.attributes.popper['data-popper-placement'] as PopperPlacement, rtl)
      : undefined,
    ref: useMergedRefs(setRootElement as (rootElement: HTMLElement | null) => void, state.ref),
    arrow: {
      style: state.targetElement ? popper.styles.arrow : undefined,
      ref: setArrowElement,
    },
  });

  return state;
};
