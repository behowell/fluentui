import * as React from 'react';
import { ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utilities';
import { TooltipSlotProps } from '../TooltipProvider/index';

/** {@docCategory Tooltip} */
export interface TooltipProps extends TooltipSlotProps {
  /**
   * The element that this Tooltip should point to.
   */
  target?: HTMLElement | null;

  /**
   * The arrow that points to the target element.
   */
  arrow?: ShorthandProps<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
}

type PropsToState<T, ShorthandPropNames extends keyof T> = Omit<T, ShorthandPropNames> &
  {
    [U in ShorthandPropNames]: T[U] extends ShorthandProps<infer P> ? ObjectShorthandProps<P> : T[U];
  };

type ComponentDefaultProps<Props, DefaultedPropNames extends keyof Props> = {
  ref: React.RefObject<HTMLElement>;
} & Omit<Props, DefaultedPropNames> &
  Required<Pick<Props, DefaultedPropNames>>;

export type TooltipPropsWithDefaults = ComponentDefaultProps<TooltipProps, 'placement' | 'arrow'> & {
  arrowRef: React.RefObject<HTMLElement>;
};

export type TooltipState = PropsToState<TooltipPropsWithDefaults, 'arrow'>;
