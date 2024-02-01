import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type RadioItemSlots = {
  /**
   * The root element of the RadioItem.
   *
   * The root slot receives the `className` and `style` specified directly on the `<RadioItem>`.
   * All other native props will be applied to the primary slot: `input`
   */
  root: NonNullable<Slot<'label'>>;

  /**
   * Container for the children of the RadioItem (its label text).
   */
  label: Slot<'span'>;

  /**
   * Hidden input that handles the RadioItem's functionality.
   *
   * This is the PRIMARY slot: all native properties specified directly on `<RadioItem>` will be applied to this slot,
   * except `className` and `style`, which remain on the root slot.
   */
  input: NonNullable<Slot<'input'>>;

  /**
   * A circle outline, with a filled circle inside when the RadioItem is checked.
   */
  indicator: NonNullable<Slot<'div'>>;
};

/**
 * RadioItem Props
 */
export type RadioItemProps = Omit<
  ComponentProps<Partial<RadioItemSlots>, 'input'>,
  'checked' | 'defaultChecked' | 'disabled' | 'name' | 'onChange' | 'required' | 'size' | 'type' | 'value'
> & {
  /**
   * The value of the RadioGroup when this RadioItem item is selected.
   */
  value?: string;

  /**
   * The position of the label relative to the indicator.
   *
   * This defaults to `after` unless the RadioItem is inside a RadioGroup with `layout="horizontalStacked"`,
   * in which case it defaults to `below`.
   *
   * @defaultvalue after
   */
  labelPosition?: 'after' | 'below';

  /**
   * Disable this RadioItem item.
   */
  disabled?: boolean;
};

/**
 * State used in rendering RadioItem
 */
export type RadioItemState = ComponentState<RadioItemSlots> &
  Required<Pick<RadioItemProps, 'labelPosition'>> & {
    hover?: boolean;
    active?: boolean;
  };
