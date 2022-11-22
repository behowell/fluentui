import * as React from 'react';
import { renderButton_unstable } from './renderButton';
import { useButton_unstable } from './useButton';
import { useButtonStyles_unstable } from './useButtonStyles';
import { mergeClasses } from '@griffel/react';
import type { ButtonProps, ButtonState } from './Button.types';

// export type UseStateFunction<Props, State, Ref = never> = Ref extends never
//   ? (props: Props) => State
//   : (props: Props, ref: React.Ref<Ref>) => State;

type ObscureEventName = 'onLostPointerCaptureCapture';
export type InferRefType<Props> = ObscureEventName extends keyof Props
  ? Required<Props>[ObscureEventName] extends React.PointerEventHandler<infer Element>
    ? Element
    : never
  : never;

export interface FluentComponent<Props, State> {
  readonly useState: (props: Props, ref: React.Ref<InferRefType<Props>>) => State;
  readonly useStyles: (state: State) => void;
  readonly render: (state: State) => React.ReactElement | null;
}

export const compose = <Props, State>(component: FluentComponent<Props, State>) => {
  const { useState, useStyles, render } = component;

  return React.forwardRef((props: Props, ref: React.Ref<InferRefType<Props>>) => {
    const state = useState(props, ref);
    useStyles(state);
    return render(state);
  });
};

export const ButtonComponent: FluentComponent<ButtonProps, ButtonState> = {
  useState: useButton_unstable,
  useStyles: useButtonStyles_unstable,
  render: renderButton_unstable,
};

export const ButtonComponentUnstyled: FluentComponent<ButtonProps, ButtonState> = {
  useState: useButton_unstable,
  useStyles: () => {},
  render: renderButton_unstable,
};

export const Button = compose<ButtonProps, ButtonState>(ButtonComponent);
Button.displayName = 'Button';

const AdminButtonComponent: FluentComponent<ButtonProps, ButtonState> = {
  ...ButtonComponent,
  useState: (props, ref) => {
    /// ...
    ButtonComponent.useState({ size: 'large', ...props }, ref);
    state.size = 'small';
    // ..
  },
  useStyles: state => {
    ButtonComponent.useStyles(state);
    state.root.className = mergeClasses('my-admin-button', state.root.className);
  },
};

export const AdminButton = recompose<ButtonProps, ButtonState>(Button, {
  useStyles: state => {
    ButtonComponent.useStyles(state);
    state.root.className = mergeClasses('my-admin-button', state.root.className);
  },
});
AdminButton.displayName = 'AdminButton';
