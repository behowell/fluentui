import { PartialTheme, Theme } from '@fluentui/react-theme';
import { internal__ThemeContext, ThemeProviderState, useThemeProviderState } from '@fluentui/react-theme-provider';
import { FocusManagementProvider } from '@fluentui/react-focus-management';
import { ComponentState, getSlots, makeMergeProps, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';

import { internal__FluentProviderContext, useFluent } from './context';

export interface ProviderProps {
  /** Sets the direction of text & generated styles. */
  dir?: 'ltr' | 'rtl';

  /** Provides the document, can be undefined during SSR render. */
  document?: Document | undefined;

  theme?: PartialTheme;
}

type PartialProviderState = ComponentState<ProviderProps, /* ShorthandProps: */ never, /* DefaultedProps: */ 'dir'>;
export type ProviderState = PartialProviderState & { theme: Theme };

const mergeProps = makeMergeProps<PartialProviderState>();

export function useFluentProviderState(draftState: PartialProviderState): ProviderState {
  const parentContext = useFluent();

  useThemeProviderState(draftState as ThemeProviderState);

  // TODO: add merge functions
  draftState.document = draftState.document || parentContext.document;
  draftState.dir = draftState.dir || parentContext.dir;

  return draftState as ProviderState;
}

export function renderFluentProvider(state: ProviderState) {
  const { slots, slotProps } = getSlots(state);
  const { dir, document, theme } = state;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const value = React.useMemo(() => ({ dir, document }), [dir, document]);

  return (
    <internal__FluentProviderContext.Provider value={value}>
      <internal__ThemeContext.Provider value={theme}>
        <FocusManagementProvider document={document} dir={dir}>
          <slots.root {...slotProps.root} />
        </FocusManagementProvider>
      </internal__ThemeContext.Provider>
    </internal__FluentProviderContext.Provider>
  );
}

/**
 * Returns the ThemeProvider render function and calculated state, given user input, ref, and
 * a set of default prop values.
 */
export function useFluentProvider(props: ProviderProps, ref: React.Ref<HTMLElement>) {
  const parentContext = useFluent();
  const rootRef = useMergedRefs(ref, React.useRef<HTMLElement>(null));
  const state = mergeProps(
    {
      ref: rootRef,
      as: 'div',
      document: parentContext.document,
      dir: parentContext.dir,
    },
    {},
    props,
  );

  return {
    state: useFluentProviderState(state),
    render: renderFluentProvider,
  };
}

/**
 * A React provider that allows to define theme, text direction and context for rendering for children components.
 */
export const FluentProvider: React.FunctionComponent<ProviderProps> = React.forwardRef<HTMLDivElement, ProviderProps>(
  (props: ProviderProps, ref: React.Ref<HTMLDivElement>) => {
    const { render, state } = useFluentProvider(props, ref);

    return render(state);
  },
);

FluentProvider.displayName = 'Provider';
