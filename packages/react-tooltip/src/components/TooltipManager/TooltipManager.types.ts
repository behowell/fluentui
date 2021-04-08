import * as React from 'react';
import { ComponentProps, ComponentState, ShorthandProps } from '@fluentui/react-utilities';
import { TooltipManagerApi, TooltipProps } from '../../types';
// import { TooltipManagerApi } from '@fluentui/react-tooltip-provider';

export interface TooltipManagerProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Ref to the imperative interface to show and hide tooltips.
   */
  componentRef?: React.Ref<TooltipManagerApi>;
}

export const tooltipManagerShorthandProps = ['tooltip'] as const;

export type TooltipManagerState = ComponentState<
  React.Ref<HTMLElement>,
  TooltipManagerProps & {
    /**
     * The Tooltip being rendered, if any.
     */
    tooltip?: ShorthandProps<TooltipProps>;
  }
>;
