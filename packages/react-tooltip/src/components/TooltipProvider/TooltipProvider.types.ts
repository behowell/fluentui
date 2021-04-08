import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

export interface TooltipProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  // TooltipProvider has no additional props
}

export const tooltipProviderShorthandProps = [] as const;

export type TooltipProviderState = ComponentState<
  React.Ref<HTMLElement>,
  TooltipProviderProps,
  typeof tooltipProviderShorthandProps[number]
>;
