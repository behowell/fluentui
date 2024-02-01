import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type RadioItemSlots = {
  root: Slot<'div'>;
};

/**
 * RadioItem Props
 */
export type RadioItemProps = ComponentProps<RadioItemSlots> & {};

/**
 * State used in rendering RadioItem
 */
export type RadioItemState = ComponentState<RadioItemSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from RadioItemProps.
// & Required<Pick<RadioItemProps, 'propName'>>
