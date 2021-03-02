import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, ShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { TooltipManagerProps, TooltipManagerState } from './TooltipManager.types';
import { useTooltipManagerRef } from '../../TooltipProvider';
import { Tooltip, TooltipProps } from '../../Tooltip';
import { TooltipManagerApi } from '../TooltipProvider/index';

export const tooltipManagerShorthandProps: (keyof TooltipManagerState)[] = ['tooltip'];

const mergeProps = makeMergeProps<TooltipManagerState>({ deepMerge: tooltipManagerShorthandProps });

const TOOLTIP_SHOW_DELAY_MS = 500;
const TOOLTIP_HIDE_DELAY_MS = 300;

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
  type TooltipInfo = {
    target: HTMLElement;
    tooltipProps: ShorthandProps<TooltipProps>;
    extraTooltipProps?: TooltipProps;
  };
  const [visibleTooltip, setVisibleTooltip] = React.useState<TooltipInfo>();

  const visibleTooltipRef = React.useRef<TooltipInfo>();
  visibleTooltipRef.current = visibleTooltip;

  const mouseTargetRef = React.useRef<HTMLElement>();

  const tooltipElementRef = React.useRef<HTMLElement>();

  const delayTimeoutId = React.useRef<number>();

  const tooltipManagerApi: TooltipManagerApi = React.useMemo(
    () => ({
      showTooltip: (
        target: HTMLElement,
        tooltipProps: ShorthandProps<TooltipProps>,
        extraTooltipProps?: TooltipProps,
      ) => {
        mouseTargetRef.current = target;

        window.clearTimeout(delayTimeoutId.current);
        delayTimeoutId.current = undefined;

        if (visibleTooltipRef.current) {
          setVisibleTooltip({ target, tooltipProps, extraTooltipProps });
        } else {
          delayTimeoutId.current = window.setTimeout(() => {
            if (mouseTargetRef.current === target) {
              setVisibleTooltip({ target, tooltipProps, extraTooltipProps });
            }
          }, TOOLTIP_SHOW_DELAY_MS);
        }
      },

      hideTooltip: (target: HTMLElement) => {
        if (mouseTargetRef.current === target) {
          mouseTargetRef.current = undefined;
        }

        if (
          mouseTargetRef.current !== visibleTooltipRef.current?.target &&
          mouseTargetRef.current !== tooltipElementRef.current
        ) {
          window.clearTimeout(delayTimeoutId.current);
          delayTimeoutId.current = undefined;

          if (visibleTooltipRef.current) {
            delayTimeoutId.current = window.setTimeout(() => {
              if (
                mouseTargetRef.current !== visibleTooltipRef.current?.target &&
                mouseTargetRef.current !== tooltipElementRef.current
              ) {
                setVisibleTooltip(undefined);
              }
            }, TOOLTIP_HIDE_DELAY_MS);
          }
        }
      },
    }),
    [],
  );

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

      window.clearTimeout(delayTimeoutId.current);
      delayTimeoutId.current = undefined;
    };
  }, [tooltipManagerApi, tooltipManagerApiRef]);

  // Create the state object
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      tooltip: visibleTooltip && {
        as: Tooltip,
        ref: tooltipElementRef,
        target: visibleTooltip?.target,
        onPointerEnter: () => {
          mouseTargetRef.current = tooltipElementRef.current;
        },
        onPointerLeave: () => {
          tooltipManagerApi.hideTooltip(tooltipElementRef.current!);
        },
        ...visibleTooltip.extraTooltipProps,
      },
    },
    defaultProps,
    props,
    resolveShorthandProps({ tooltip: visibleTooltip?.tooltipProps }, tooltipManagerShorthandProps),
  );

  return state;
};
