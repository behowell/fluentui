import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, ShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { TooltipManagerProps, tooltipManagerShorthandProps, TooltipManagerState } from './TooltipManager.types';
import { Tooltip, TooltipProps } from '../Tooltip';
import { useTooltipManagerRef } from '../TooltipProvider';
import { TooltipOptions, TooltipManagerApi } from '../../types';

const mergeProps = makeMergeProps<TooltipManagerState>({ deepMerge: tooltipManagerShorthandProps });

const TOOLTIP_SHOW_DELAY_MS = 250;
const TOOLTIP_HIDE_DELAY_MS = 250;

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
    triggerElement: HTMLElement;
    tooltipProps: ShorthandProps<TooltipProps>;
    options?: TooltipOptions;
  };
  const [visibleTooltip, setVisibleTooltip] = React.useState<VisibleTooltip>();

  const visibleTooltipRef = React.useRef<VisibleTooltip>();
  visibleTooltipRef.current = visibleTooltip;

  const mouseTargetRef = React.useRef<HTMLElement>();
  const tooltipElementRef = React.useRef<HTMLElement>();

  const delayTimeoutId = React.useRef<number>();
  const clearDelayTimeout = () => {
    window.clearTimeout(delayTimeoutId.current);
    delayTimeoutId.current = undefined;
  };
  // Clean up the timeout when the component is unloaded
  React.useEffect(() => clearDelayTimeout, []);

  // Create the TooltipManagerApi implementation to set on the context
  const tooltipManagerApi: TooltipManagerApi = React.useMemo(() => {
    const showTooltip = (
      triggerElement: HTMLElement,
      tooltipProps: ShorthandProps<TooltipProps>,
      options?: TooltipOptions,
    ) => {
      mouseTargetRef.current = triggerElement;

      clearDelayTimeout();

      if (visibleTooltipRef.current || options?.showDelay === 0) {
        setVisibleTooltip({ triggerElement, tooltipProps, options });
      } else {
        setVisibleTooltip(undefined);

        delayTimeoutId.current = window.setTimeout(() => {
          if (mouseTargetRef.current === triggerElement) {
            setVisibleTooltip({ triggerElement, tooltipProps, options });
          }
        }, options?.showDelay ?? TOOLTIP_SHOW_DELAY_MS);
      }
    };

    const hideTooltip = (triggerElement: HTMLElement) => {
      if (mouseTargetRef.current === triggerElement) {
        mouseTargetRef.current = undefined;
      }

      if (
        mouseTargetRef.current !== visibleTooltipRef.current?.triggerElement &&
        mouseTargetRef.current !== tooltipElementRef.current
      ) {
        clearDelayTimeout();

        if (visibleTooltipRef.current) {
          delayTimeoutId.current = window.setTimeout(() => {
            if (
              mouseTargetRef.current !== visibleTooltipRef.current?.triggerElement &&
              mouseTargetRef.current !== tooltipElementRef.current
            ) {
              setVisibleTooltip(undefined);
            }
          }, visibleTooltipRef.current.options?.hideDelay ?? TOOLTIP_HIDE_DELAY_MS);
        }
      }
    };

    const hideAll = () => {
      clearDelayTimeout();
      setVisibleTooltip(undefined);
    };

    return { showTooltip, hideTooltip, hideAll };
  }, []);

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
        ref: tooltipElementRef,
        targetElement: visibleTooltip.triggerElement,
        onPointerEnter: () => {
          mouseTargetRef.current = tooltipElementRef.current;
        },
        onPointerLeave: () => {
          tooltipManagerApi.hideTooltip(tooltipElementRef.current!);
        },
        id: visibleTooltip.options?.id,
      },
    },
    defaultProps,
    props,
    resolveShorthandProps({ tooltip: visibleTooltip?.tooltipProps }, tooltipManagerShorthandProps),
  );

  return state;
};
