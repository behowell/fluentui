import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * {@docCategoryAccordionPanel} */
export interface AccordionPanelProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

/**
 * Consts listing which props are shorthand props.
 */
export const accordionPanelShorthandProps = [] as const;

/**
 * {@docCategoryAccordionPanel} */
export type AccordionPanelState = ComponentState<
  AccordionPanelProps & {
    /**
     * Internal open state, provided by context
     */
    open: boolean;
  },
  /* ShorthandProps: */ typeof accordionPanelShorthandProps[number]
>;
