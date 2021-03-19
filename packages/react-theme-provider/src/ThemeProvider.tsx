import { mergeThemes, themeToCSSVariables, PartialTheme, Theme } from '@fluentui/react-theme';
import { ComponentState, getSlots, makeMergeProps, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';

import { internal__ThemeContext, useTheme } from './context';

export interface ThemeProviderProps extends React.HTMLAttributes<HTMLElement> {
  theme?: PartialTheme | Theme;
}
export type PartialThemeProviderState = ComponentState<ThemeProviderProps>;
export type ThemeProviderState = PartialThemeProviderState & { theme: Theme };

const mergeProps = makeMergeProps<PartialThemeProviderState>();

export function useThemeProviderState(draftState: PartialThemeProviderState): ThemeProviderState {
  const parentTheme = useTheme();
  const localTheme = draftState.theme;
  const mergedTheme = mergeThemes(parentTheme, localTheme);

  draftState.theme = mergedTheme;
  draftState.style = React.useMemo(() => {
    // TODO: should we consider insertion to head?
    //       - how to modify, remove styles?
    //       - SSR rendering

    // TODO: what variables should be rendered? Merged or only changed?
    // TODO: how we will proceed with Portals?
    return {
      ...draftState.style,
      ...themeToCSSVariables(mergedTheme),
    };
  }, [draftState.style, mergedTheme]);

  return draftState as ThemeProviderState;
}

export function renderThemeProvider(state: ThemeProviderState) {
  const { slots, slotProps } = getSlots(state);
  const { theme } = state;

  return (
    <internal__ThemeContext.Provider value={theme}>
      <slots.root {...slotProps.root} />
    </internal__ThemeContext.Provider>
  );
}

/**
 * Returns the ThemeProvider render function and calculated state, given user input, ref, and
 * a set of default prop values.
 */
export function useThemeProvider(props: ThemeProviderProps, ref: React.Ref<HTMLElement>) {
  const rootRef = useMergedRefs(ref, React.useRef<HTMLElement>(null));
  const state = mergeProps(
    {
      ref: rootRef,
      as: 'div',
    },
    {},
    props,
  );

  return {
    state: useThemeProviderState(state),
    render: renderThemeProvider,
  };
}

/**
 * Used to provide CSS variables to DOM and theme tokens via React Context.
 */
export const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = React.forwardRef<
  HTMLDivElement,
  ThemeProviderProps
>((props: ThemeProviderProps, ref: React.Ref<HTMLDivElement>) => {
  const { render, state } = useThemeProvider(props, ref);

  return render(state);
});

ThemeProvider.displayName = 'ThemeProvider';
