import * as React from 'react';
import { ComponentState, ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utilities';
import { MenuListProps } from '../MenuList/index';

/**
 * Extends and drills down Menulist props to simplify API
 * {@docCategory Menu }
 */
export interface MenuProps extends MenuListProps {
  /**
   * Explicitly require children
   */

  children: React.ReactNode;
  /**
   * Whether the popup is open
   */
  open?: boolean;

  /**
   * Whether the popup is open by default
   */
  defaultOpen?: boolean;

  /**
   * Wrapper to style and add events for the popup
   */
  menuPopup?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
}

export const menuShorthandProps = ['menuPopup'] as const;

/**
 * {@docCategory Menu }
 */
export type PartialMenuState = ComponentState<
  MenuProps,
  /* ShorthandProps: */ typeof menuShorthandProps[number],
  /* DefaultedProps: */ 'open' | 'menuPopup'
>;

/**
 * {@docCategory Menu }
 */
export type MenuState = PartialMenuState & {
  /**
   * Callback to open/close the popup
   */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Internal react node that just simplifies handling children
   */
  menuList: React.ReactNode;

  /**
   * Internal react node that just simplifies handling children
   */
  menuTrigger: React.ReactNode;

  /**
   * Wrapper to style and add events for the popup
   */
  menuPopup: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
};
