import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { TooltipProviderProps, tooltipProviderShorthandProps, TooltipProviderState } from './TooltipProvider.types';
import { TooltipManagerApi, TooltipProps } from '../../types';

const mergeProps = makeMergeProps<TooltipProviderState>({ deepMerge: tooltipProviderShorthandProps });

/**
 * Create the state required to render TooltipProvider.
 *
 * The returned state can be modified with hooks such as useTooltipProviderStyles,
 * before being passed to renderTooltipProvider.
 *
 * @param props - props from this instance of TooltipProvider
 * @param ref - reference to root HTMLElement of TooltipProvider
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory TooltipProvider}
 */
export const useTooltipProvider = (
  props: TooltipProviderProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: TooltipProviderProps,
): TooltipProviderState => {
  const state = mergeProps(
    {
      ref,
    },
    defaultProps && resolveShorthandProps(defaultProps, tooltipProviderShorthandProps),
    resolveShorthandProps(props, tooltipProviderShorthandProps),
  );

  return state;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const internal__TooltipManagerRefContext = React.createContext<
  React.MutableRefObject<TooltipManagerApi | undefined>
>({ current: undefined });

export const useTooltipManagerRef = () => React.useContext(internal__TooltipManagerRefContext);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const internal__TooltipRendererContext = React.createContext<
  React.FC<TooltipProps & React.RefAttributes<HTMLElement>> | undefined
>(undefined);

export const useTooltipRenderer = () => React.useContext(internal__TooltipRendererContext);
