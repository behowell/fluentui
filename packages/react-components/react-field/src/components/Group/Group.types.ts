import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { FieldContextValue } from '../Field/Field.types';

export type GroupSlots = {
  /**
   * The radio group root.
   */
  root: NonNullable<Slot<'div'>>;
};

export type GroupProps = ComponentProps<Partial<GroupSlots>> & {
  /**
   * How the items are laid out in the group.
   *
   * @default vertical
   */
  layout?: 'vertical' | 'horizontal';
};

/**
 * State used in rendering Group
 */
export type GroupState = ComponentState<GroupSlots> & Required<Pick<GroupProps, 'layout'>>;

export type GroupContextValues = {
  field: FieldContextValue | undefined;
};
