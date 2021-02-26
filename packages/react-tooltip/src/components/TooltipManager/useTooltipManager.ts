import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, ShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { TooltipManagerProps, TooltipManagerState } from './TooltipManager.types';
import { useTooltipManagerRef } from '../../TooltipProvider';
import { Tooltip, TooltipProps } from '../../Tooltip';

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
  const currentTargetRef = React.useRef<HTMLElement | null>(null);

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
    props,
    resolveShorthandProps({ tooltip: currentTooltip }, tooltipManagerShorthandProps),
  );

  // Register this instance of TooltipManager with the TooltipManagerRef from TooltipProvider
  const managerRef = useTooltipManagerRef();
  React.useLayoutEffect(() => {
    if (managerRef.current !== undefined) {
      // Another TooltipManager has already registered; don't overwrite it
      // REVIEW should this be an error?
      return;
    }

    managerRef.current = {
      show: (target: HTMLElement, tooltip: ShorthandProps<TooltipProps>) => {
        setCurrentTooltip(tooltip);
        currentTargetRef.current = target;
      },

      hide: (_: HTMLElement) => {
        setCurrentTooltip(undefined);
        currentTargetRef.current = null;
      },
    };

    return () => {
      managerRef.current = undefined;
    };
  }, [managerRef]);

  return state;
};
