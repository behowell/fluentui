import { EnterKey, getCode, SpacebarKey } from '@fluentui/keyboard-key';
import { useMenuListContext } from '../menuListContext';
import { MenuItemSelectableProps, MenuItemSelectableState, SelectableHandler } from './types';

/**
 * Hook used to perform the shared operations that any selectable menu item will need
 *
 * @param state - Selectable menu item state
 * @param handleSelection - Each kind of selecatable will have its own way of handling selection
 */
export const useMenuItemSelectable = <TState extends MenuItemSelectableProps & Partial<MenuItemSelectableState>>(
  state: TState,
  handleSelection: SelectableHandler = () => null,
): TState & MenuItemSelectableState => {
  const { onClick: onClickCallback, onKeyDown: onKeyDownCallback } = state;

  const checked = useMenuListContext(context => {
    const checkedItems = context.checkedValues?.[state.name] || [];
    return checkedItems.indexOf(state.value) !== -1;
  });

  const menuItemSelectableState: MenuItemSelectableState = {
    checked,
    'aria-checked': checked,

    onClick: e => {
      if (onClickCallback) {
        onClickCallback(e);
      }

      handleSelection(e, state.name, state.value, checked);
    },

    onKeyDown: e => {
      if (onKeyDownCallback) {
        onKeyDownCallback(e);
      }

      const keyCode = getCode(e);
      if (!e.defaultPrevented && (keyCode === EnterKey || keyCode === SpacebarKey)) {
        handleSelection(e, state.name, state.value, checked);
      }
    },
  };

  return Object.assign(state, menuItemSelectableState);
};
