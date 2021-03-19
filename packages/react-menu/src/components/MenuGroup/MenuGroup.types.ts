import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * {@docCategory MenuGroup}
 */
export type MenuGroupProps = ComponentProps & React.HTMLAttributes<HTMLElement>;

/**
 * Consts listing which props are shorthand props.
 */
// REVIEW: menuGroupShorthandProps don't refer to actual MenuGroupProps?
export const menuGroupShorthandProps = [] /* ['loader', 'content'] */ as const;

/**
 * {@docCategory MenuGroup}
 */
export type MenuGroupState = ComponentState<
  MenuGroupProps & {
    /**
     * id applied to the DOM element of `MenuGroupHeader`
     */
    headerId: string;
  },
  /* ShorthandProps: */ typeof menuGroupShorthandProps[number]
>;
