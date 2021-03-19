import * as React from 'react';
import { ComponentProps, ComponentState, ShorthandProps } from '@fluentui/react-utilities';

export type AccordionHeaderSize = 'small' | 'medium' | 'large' | 'extra-large';
export type AccordionHeaderExpandIconPosition = 'start' | 'end';

/**
 * {@docCategoryAccordionHeader} */
export interface AccordionHeaderExpandIconProps extends React.HTMLAttributes<HTMLElement> {
  open: boolean;
  expandIconPosition: AccordionHeaderExpandIconPosition;
}

/**
 * {@docCategoryAccordionHeader} */
export interface AccordionHeaderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Size of spacing in the heading
   */
  size?: AccordionHeaderSize;
  /**
   * The component to be used as button in heading
   */
  button?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
  /**
   * Expand icon slot rendered before (or after) children content in heading
   */
  expandIcon?: ShorthandProps<AccordionHeaderExpandIconProps>;
  /**
   * The position of the expand  icon slot in heading
   */
  expandIconPosition?: AccordionHeaderExpandIconPosition;
}

/**
 * Consts listing which props are shorthand props.
 */
export const accordionHeaderShorthandProps = ['expandIcon', 'button', 'children'] as const;

/**
 * {@docCategoryAccordionHeader} */
export type AccordionHeaderState = ComponentState<
  AccordionHeaderProps,
  /* ShorthandProps: */ typeof accordionHeaderShorthandProps[number],
  /* DefaultedProps: */ 'size' | 'expandIcon' | 'expandIconPosition' | 'button'
>;
