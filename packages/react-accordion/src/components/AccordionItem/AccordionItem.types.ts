import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

export interface AccordionItemContext {
  headingId: string;
  panelId: string;
  open: boolean;
  onHeaderClick(ev: React.MouseEvent<HTMLElement>): void;
}

/**
 * {@docCategoryAccordionItem} */
export interface AccordionItemProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Disables opening/closing of panel
   */
  disabled?: boolean;
}
/**
 * Consts listing which props are shorthand props.
 */
export const accordionItemShorthandProps = [] as const;

/**
 * {@docCategoryAccordionItem} */
export type PartialAccordionItemState = ComponentState<
  AccordionItemProps,
  /* ShorthandProps: */ typeof accordionItemShorthandProps[number],
  /* DefaultedProps: */ never,
  React.RefObject<HTMLElement>
>;

/**
 * {@docCategoryAccordionItem} */
export type AccordionItemState = PartialAccordionItemState & {
  context: AccordionItemContext;
};
