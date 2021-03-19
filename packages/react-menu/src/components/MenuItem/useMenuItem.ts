import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { MenuItemProps, menuItemShorthandProps, MenuItemState } from './MenuItem.types';
import { useCharacterSearch } from '../../utils/useCharacterSearch';

const mergeProps = makeMergeProps<MenuItemState>({ deepMerge: menuItemShorthandProps });

/**
 * Returns the props and state required to render the component
 */
export const useMenuItem = (
  props: MenuItemProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuItemProps,
): MenuItemState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      icon: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, menuItemShorthandProps),
  );

  useCharacterSearch(state);
  return state;
};
