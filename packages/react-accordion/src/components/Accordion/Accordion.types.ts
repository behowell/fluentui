import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { Descendant } from '../../utils/descendants';
import { AccordionHeaderProps } from '../AccordionHeader/AccordionHeader.types';

export type AccordionIndex = number | number[];

/**
 * Common properties shared between Accordion and AccordionHeader through context
 */
type AccordionHeaderCommonProps = Pick<AccordionHeaderProps, 'expandIcon' | 'expandIconPosition' | 'button' | 'size'>;
export interface AccordionContext extends AccordionHeaderCommonProps {
  /**
   * The list of opened panels by index
   */
  openItems: number[];
  /**
   * Callback used by AccordionItem to request a change on it's own opened state
   */
  requestToggle: NonNullable<AccordionProps['onToggle']>;
}

/**
 * {@docCategory Accordion}
 */
export interface AccordionProps extends ComponentProps, AccordionHeaderCommonProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Indicates if Accordion support multiple Panels opened at the same time
   */
  multiple?: boolean;
  /**
   * Indicates if Accordion support multiple Panels closed at the same time
   */
  collapsible?: boolean;
  /**
   * Controls the state of the panel
   */
  index?: AccordionIndex;
  /**
   * Default value for the uncontrolled state of the panel
   */
  defaultIndex?: AccordionIndex;
  onToggle?(event: React.MouseEvent<HTMLElement>, index: number): void;
}

/**
 * Consts listing which props are shorthand props.
 */
export const accordionShorthandProps = [] as const;

export type PartialAccordionState = ComponentState<
  AccordionProps,
  /* ShorthandProps: */ typeof accordionShorthandProps[number],
  /* DefaultedProps: */ 'multiple' | 'collapsible'
>;

export type AccordionState = PartialAccordionState & {
  /**
   * Internal Context used by Accordion and AccordionItem communication
   */
  context: AccordionContext;
  /**
   * Internal Context used by Accordion and AccordionItem communication
   */
  descendants: AccordionDescendant[];
  /**
   * Internal Context used by Accordion and AccordionItem communication
   */
  setDescendants: React.Dispatch<React.SetStateAction<AccordionDescendant[]>>;
};

export interface AccordionDescendant<ElementType = HTMLElement> extends Descendant<ElementType> {
  /**
   * Indicates is a determined AccordionItem descending the Accordion is or not disabled
   */
  disabled: boolean;
}
