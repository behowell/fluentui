import * as React from 'react';
import { ComponentProps, ComponentState, ShorthandProps } from '@fluentui/react-utilities';
import { MenuItemSelectableProps, MenuItemSelectableState } from '../../selectable/index';
import { MenuItemProps } from '../MenuItem/MenuItem.types';

/**
 * {@docCategory MenuItemCheckbox}
 */
export interface MenuItemCheckboxProps
  extends ComponentProps,
    React.HTMLAttributes<HTMLElement>,
    MenuItemProps,
    MenuItemSelectableProps {
  /**
   * Icon slot rendered before children content
   */
  icon?: ShorthandProps<HTMLElement>;

  /**
   * Slot for the checkmark indicator
   */
  checkmark?: ShorthandProps<HTMLElement>;
}

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemCheckboxShorthandProps = ['icon', 'checkmark'] as const;

/**
 * {@docCategory MenuItemCheckbox}
 */
export type MenuItemCheckboxState = MenuItemSelectableState &
  ComponentState<
    MenuItemCheckboxProps,
    /* ShorthandProps: */ typeof menuItemCheckboxShorthandProps[number],
    /* DefaultedProps: */ 'icon' | 'checkmark'
  >;
