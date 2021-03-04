import * as React from 'react';
import { ObjectShorthandProps, ResolvedShorthandProps, ShorthandProps } from './types';

/**
 * Ensures that the given slots are represented using object syntax. This ensures that
 * the object can be merged along with other objects.
 * @param props - The incoming props
 * @param shorthandPropNames - An array of prop names to apply simplification to
 */
export const resolveShorthandProps = <TProps, TShorthandPropNames extends keyof TProps>(
  props: TProps,
  shorthandPropNames: readonly TShorthandPropNames[],
) => {
  let newProps = props;

  if (shorthandPropNames && shorthandPropNames.length) {
    newProps = { ...props };
    for (const propName of shorthandPropNames) {
      newProps[propName] = resolveShorthandProp(props[propName]);
    }
  }

  return (newProps as unknown) as ResolvedShorthandProps<TProps, TShorthandPropNames>;
};

/**
 * Resolve a single ShorthandProps object into an ObjectShorthandProps
 *
 * @param propValue - The value of the shorthand prop to be resolved
 */
export const resolveShorthandProp = <T,>(propValue: ShorthandProps<T>): ObjectShorthandProps<T> => {
  if (propValue !== undefined && (typeof propValue !== 'object' || React.isValidElement(propValue))) {
    return ({ children: propValue } as unknown) as ObjectShorthandProps<T>;
  }

  return (propValue as unknown) as ObjectShorthandProps<T>;
};
