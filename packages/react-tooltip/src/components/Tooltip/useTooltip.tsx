import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { TooltipProps, TooltipState } from './Tooltip.types';

export const tooltipShorthandProps: (keyof TooltipProps)[] = ['arrow'];

export const mergeProps = makeMergeProps<TooltipState>({ deepMerge: tooltipShorthandProps });

/**
 * Create the state required to render Tooltip.
 *
 * The returned state can be modified with hooks such as useTooltipStyles,
 * before being passed to renderTooltip.
 *
 * @param props - props from this instance of Tooltip
 * @param ref - reference to root HTMLElement of Tooltip
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory Tooltip}
 */
export const useTooltip = (
  props: TooltipProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: TooltipProps,
): TooltipState => {
  const state = mergeProps(
    {
      as: 'div',
      placement: 'bottom',
      ref: useMergedRefs(ref, React.useRef<HTMLElement>(null)),
      arrow: {
        as: 'div',
        children: '',
      },
    },
    defaultProps,
    resolveShorthandProps(props, tooltipShorthandProps),
  );

  return state;
};
