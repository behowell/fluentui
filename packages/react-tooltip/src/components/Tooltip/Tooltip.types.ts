import * as React from 'react';
import { ComponentProps, ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utilities';

/** {@docCategory Tooltip} */
export interface TooltipProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * How to position the tooltip relative to the target element. This is a "best effort" placement,
   * but the tooltip may be flipped to the other side if there is not enough room.
   *
   * @defaultvalue bottom
   */
  placement?: TooltipPlacement;

  /**
   * Subtle color variant
   */
  subtle?: boolean;

  /**
   * The element that this Tooltip should point to.
   */
  targetRef?: React.RefObject<HTMLElement | null>;

  /**
   * The arrow that points to the target element.
   */
  arrow?: ShorthandProps<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
}

/** {@docCategory Tooltip} */
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
