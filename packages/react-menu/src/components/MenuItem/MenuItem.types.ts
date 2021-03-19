import * as React from 'react';
import { ComponentProps, ShorthandProps, ComponentState } from '@fluentui/react-utilities';

export interface MenuItemProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Icon slot rendered before children content
   */
  icon?: ShorthandProps<HTMLElement>;
}

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemShorthandProps = ['icon'] as const;

export type MenuItemState = ComponentState<
  MenuItemProps,
  /* ShorthandProps: */ typeof menuItemShorthandProps[number],
  /* DefaultedProps: */ 'icon'
>;
