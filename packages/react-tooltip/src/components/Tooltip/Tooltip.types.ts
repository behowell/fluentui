import * as React from 'react';
import { ComponentProps, ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utilities';

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

/**
 * {@docCategory Tooltip }
 */
export interface TooltipProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * The element that this Tooltip should point to.
   */
  targetRef?: React.RefObject<HTMLElement | null>;

  /**
   * How to position the tooltip relative to the target element
   *
   * @defaultvalue bottom
   */
  placement?: TooltipPlacement;

  /**
   * The arrow ("beak") that points to the target element
   */
  arrow?: ShorthandProps<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;

  /**
   * Subtle color variant
   */
  subtle?: boolean;
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
