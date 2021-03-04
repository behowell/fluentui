import * as React from 'react';
import {
  makeMergeProps,
  ObjectShorthandProps,
  resolveShorthandProp,
  resolveShorthandProps,
  ShorthandProps,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { TooltipManagerProps, tooltipManagerShorthandProps, TooltipManagerState } from './TooltipManager.types';
import { Tooltip, TooltipProps } from '../Tooltip';
import { useTooltipManagerRef } from '../TooltipProvider';
import { TooltipManagerApi } from '../../types';

const mergeProps = makeMergeProps<TooltipManagerState>({ deepMerge: tooltipManagerShorthandProps });

const TOOLTIP_SHOW_DELAY_MS = 250;
const TOOLTIP_HIDE_DELAY_MS = 250;

const useTimeout = () => {
  type TimeoutState = {
    id: number | undefined;
    set: (fn: () => void, delay: number) => void;
    clear: () => void;
  };

  const state = React.useRef<TimeoutState>({
    id: undefined,
    set: (fn: () => void, delay: number) => {
      state.clear();
      state.id = window.setTimeout(fn, delay);
    },
    clear: () => {
      if (state.id !== undefined) {
        window.clearTimeout(state.id);
        state.id = undefined;
      }
    },
  }).current;

  // Clean up the timeout when the component is unloaded
  React.useEffect(() => state.clear, [state.clear]);

  return [state.set, state.clear] as const;
};

/**
 * Create the state required to render TooltipManager.
 *
 * The returned state can be modified with hooks such as useTooltipManagerStyles,
 * before being passed to renderTooltipManager.
 *
 * @param props - props from this instance of TooltipManager
 * @param ref - reference to root HTMLElement of TooltipManager
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory TooltipManager}
 */
export const useTooltipManager = (
  props: TooltipManagerProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: TooltipManagerProps,
): TooltipManagerState => {
  // Use state to keep track of the current Tooltip being shown (if any), and the element it's attached to
  type VisibleTooltip = {
    readonly triggerElement: HTMLElement;
    readonly tooltipProps: ObjectShorthandProps<TooltipProps>;
  };
  const [visibleTooltip, setVisibleTooltip] = React.useState<VisibleTooltip>();

  const visibleTooltipRef = React.useRef<VisibleTooltip>();
  visibleTooltipRef.current = visibleTooltip;

  const mouseTargetRef = React.useRef<HTMLElement>();

  const [setDelayTimeout, clearDelayTimeout] = useTimeout();

  // Create the TooltipManagerApi implementation
  const tooltipManagerApi: TooltipManagerApi = React.useMemo(() => {
    const showTooltip = (triggerElement: HTMLElement, tooltipShorthandProps: ShorthandProps<TooltipProps>) => {
      const tooltipProps = resolveShorthandProp(tooltipShorthandProps);

      mouseTargetRef.current = triggerElement;

      clearDelayTimeout();

      const showDelay = tooltipProps.showDelay ?? TOOLTIP_SHOW_DELAY_MS;
      if (visibleTooltipRef.current || showDelay === 0) {
        setVisibleTooltip({ triggerElement, tooltipProps });
      } else {
        setDelayTimeout(() => {
          if (mouseTargetRef.current === triggerElement) {
            setVisibleTooltip({ triggerElement, tooltipProps });
          }
        }, showDelay);
      }
    };

    const hideTooltip = (triggerElement: HTMLElement) => {
      if (mouseTargetRef.current === triggerElement) {
        mouseTargetRef.current = undefined;
      }

      if (!mouseTargetRef.current || mouseTargetRef.current !== visibleTooltipRef.current?.triggerElement) {
        clearDelayTimeout();

        if (visibleTooltipRef.current) {
          const hideDelay = visibleTooltipRef.current.tooltipProps?.hideDelay ?? TOOLTIP_HIDE_DELAY_MS;
          if (!hideDelay) {
            setVisibleTooltip(undefined);
          } else {
            setDelayTimeout(() => {
              if (!mouseTargetRef.current || mouseTargetRef.current !== visibleTooltipRef.current?.triggerElement) {
                setVisibleTooltip(undefined);
              }
            }, hideDelay);
          }
        }
      }
    };

    const hideAll = () => {
      clearDelayTimeout();
      setVisibleTooltip(undefined);
    };

    return { showTooltip, hideTooltip, hideAll };
  }, [setDelayTimeout, clearDelayTimeout]);

  // Register this instance of TooltipManager with the TooltipManagerRef from TooltipProvider
  const tooltipManagerApiRef = useTooltipManagerRef();
  React.useLayoutEffect(() => {
    if (tooltipManagerApiRef.current !== undefined) {
      // Another TooltipManager has already registered; don't overwrite it
      // REVIEW should this be an error?
      return;
    }

    tooltipManagerApiRef.current = tooltipManagerApi;
    return () => {
      tooltipManagerApiRef.current = undefined;
    };
  }, [tooltipManagerApi, tooltipManagerApiRef]);

  // Listen for the escape key on the document
  React.useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' || ev.key === 'Esc') {
        tooltipManagerApi.hideAll();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [tooltipManagerApi]);

  // Create the state object
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      tooltip: visibleTooltip && {
        as: Tooltip,
        targetElement: visibleTooltip.triggerElement,
      },
    },
    defaultProps,
    props,
    visibleTooltip && resolveShorthandProps({ tooltip: visibleTooltip.tooltipProps }, ['tooltip']),
  );

  return state;
};
