import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, ShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { TooltipManagerProps, TooltipManagerState } from './TooltipManager.types';
import { useTooltipManagerRef } from '../../TooltipProvider';
import { Tooltip, TooltipProps } from '../../Tooltip';
import { usePopper } from 'react-popper';

export const tooltipManagerShorthandProps: (keyof TooltipManagerState)[] = ['tooltip'];

const mergeProps = makeMergeProps<TooltipManagerState>({ deepMerge: tooltipManagerShorthandProps });

const nullRender = () => null;

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
 * {@docCategory TooltipManager }
 */
export const useTooltipManager = (
  props: TooltipManagerProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: TooltipManagerProps,
): TooltipManagerState => {
  // Use state to keep track of the current Tooltip being shown (if any), and the element it's attached to
  const [currentTooltip, setCurrentTooltip] = React.useState<ShorthandProps<TooltipProps>>();
  const [currentTooltipDefaultProps, setCurrentTooltipDefaultProps] = React.useState<TooltipProps>();
  const currentTargetRef = React.useRef<HTMLElement | null>(null);

  // Register this instance of TooltipManager with the TooltipManagerRef from TooltipProvider
  const tooltipManagerApiRef = useTooltipManagerRef();
  React.useLayoutEffect(() => {
    if (tooltipManagerApiRef.current !== undefined) {
      // Another TooltipManager has already registered; don't overwrite it
      // REVIEW should this be an error?
      return;
    }

    tooltipManagerApiRef.current = {
      showTooltip: (target: HTMLElement, tooltip: ShorthandProps<TooltipProps>, defaultTooltipProps?: TooltipProps) => {
        setCurrentTooltip(tooltip);
        setCurrentTooltipDefaultProps(defaultTooltipProps);
        currentTargetRef.current = target;
      },

      hideTooltip: (target: HTMLElement) => {
        if (currentTargetRef.current === target) {
          // setCurrentTooltip(undefined);
          // setCurrentTooltipDefaultProps(undefined);
          // currentTargetRef.current = null;
        }
      },
    };

    return () => {
      tooltipManagerApiRef.current = undefined;
    };
  }, [tooltipManagerApiRef]);

  // Create the state object
  const state = mergeProps(
    {
      tooltip: {
        as: currentTooltip ? Tooltip : nullRender,
        targetRef: currentTargetRef,
      },
      ref: useMergedRefs(ref, React.useRef(null)),
    },
    defaultProps,
    {
      tooltip: currentTooltipDefaultProps,
    },
    props,
    resolveShorthandProps({ tooltip: currentTooltip }, tooltipManagerShorthandProps),
  );

  // TODO
  usePopper;

  return state;
};
