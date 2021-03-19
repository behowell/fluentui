import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs, useControllableValue } from '@fluentui/react-utilities';
import { MenuProps, menuShorthandProps, MenuState, PartialMenuState } from './Menu.types';
import { MenuTrigger } from '../MenuTrigger/index';

const mergeProps = makeMergeProps<PartialMenuState>({ deepMerge: menuShorthandProps });

/**
 * Create the state required to render Menu.
 *
 * The returned state can be modified with hooks such as useMenuStyles,
 * before being passed to renderMenu.
 *
 * @param props - props from this instance of Menu
 * @param ref - reference to root HTMLElement of Menu
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory Menu }
 */
export const useMenu = (props: MenuProps, ref: React.Ref<HTMLElement>, defaultProps?: MenuProps): MenuState => {
  const state = mergeProps(
    {
      children: null,
      ref: useMergedRefs(ref, React.useRef(null)),
      menuPopup: { as: 'div' },
      open: false,
    },
    defaultProps,
    resolveShorthandProps(props, menuShorthandProps),
  );

  // TODO Better way to narrow types ?
  const children = React.Children.toArray(state.children) as React.ReactElement[];

  // TODO throw warnings in development safely
  if (children.length !== 2) {
    // eslint-disable-next-line no-console
    console.warn('Menu can only take one MenuTrigger and one MenuList as children');
  }

  let menuTrigger: React.ReactNode;
  let menuList: React.ReactNode;
  children.forEach(child => {
    if (child.type === MenuTrigger) {
      menuTrigger = child;
    } else {
      menuList = child;
    }
  });

  state.menuPopup.children = (Component, p) => {
    return <Component {...p}> {menuList} </Component>;
  };

  const [open, setOpen] = useControllableValue(state.open, state.defaultOpen);
  // TODO fix useControllableValue typing

  return Object.assign(state, {
    menuTrigger,
    menuList,
    open: open !== undefined ? open : state.open,
    setOpen: React.useCallback((...args: Parameters<typeof setOpen>) => setOpen(...args), [setOpen]),
  });
};
