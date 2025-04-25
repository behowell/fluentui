import * as React from 'react';

import { Escape } from '@fluentui/keyboard-keys';
import {
  mergeArrowOffset,
  resolvePositioningShorthand,
  usePositioning,
  type PositioningImperativeRef,
} from '@fluentui/react-positioning';
import {
  useFluent_unstable as useFluent,
  useTooltipVisibility_unstable as useTooltipVisibility,
} from '@fluentui/react-shared-contexts';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  slot,
  useControllableState,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { OnVisibleChangeData } from '../Tooltip/Tooltip.types';
import type { TooltipContentProps, TooltipContentState } from './TooltipContent.types';
import { arrowHeight, tooltipBorderRadius } from './private/constants';

/**
 * Create the state required to render TooltipContent.
 *
 * The returned state can be modified with hooks such as useTooltipContentStyles_unstable,
 * before being passed to renderTooltipContent_unstable.
 *
 * @param props - props from this instance of TooltipContent
 */
export const useTooltipContent_unstable = (
  props: TooltipContentProps,
  ref: React.Ref<HTMLDivElement>,
): TooltipContentState => {
  'use no memo';

  const context = useTooltipVisibility();
  const { targetDocument } = useFluent();

  const {
    alwaysRender = false,
    appearance = 'normal',
    hideDelay = 250,
    withArrow = false,
    onVisibleChange,
    mountNode,
  } = props;

  type PendingVisible = {
    ev: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement> | undefined;
    data: OnVisibleChangeData;
    time: number;
  };

  const [pendingVisible, setPendingVisible] = React.useState<PendingVisible | undefined>(undefined);
  const [visible, setVisibleInternal] = useControllableState({ state: props.visible, initialState: false });
  const setVisible = React.useCallback(
    (ev: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement> | undefined, data: OnVisibleChangeData) => {
      setPendingVisible(undefined);
      setVisibleInternal(oldVisible => {
        if (data.visible !== oldVisible) {
          onVisibleChange?.(ev, data);
        }
        return data.visible;
      });
    },
    [setVisibleInternal, onVisibleChange],
  );

  React.useEffect(() => {
    const targetWindow = targetDocument?.defaultView;
    if (pendingVisible && targetWindow) {
      const { ev, data, time } = pendingVisible;
      const delay = Math.max(0, time - Date.now());
      const id = targetWindow.setTimeout(() => setVisible(ev, data), delay);
      return () => {
        targetWindow.clearTimeout(id);
      };
    }
  }, [pendingVisible, targetDocument, setVisible]);

  const positioning = resolvePositioningShorthand(props.positioning ?? 'above');
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const {
    targetRef,
    containerRef,
    arrowRef,
  }: {
    targetRef: React.MutableRefObject<unknown>;
    containerRef: React.MutableRefObject<HTMLDivElement>;
    arrowRef: React.MutableRefObject<HTMLDivElement>;
  } = usePositioning({
    enabled: visible,
    arrowPadding: 2 * tooltipBorderRadius,
    position: 'above' as const,
    align: 'center' as const,
    offset: withArrow ? mergeArrowOffset(positioning.offset, arrowHeight) : 4,
    positioningRef,
    ...positioning,
  });

  // When this tooltip is visible, hide any other tooltips, and register it
  // as the visibleTooltip with the TooltipContentContext.
  // Also add a listener on document to hide the tooltip if Escape is pressed
  useIsomorphicLayoutEffect(() => {
    if (visible) {
      const thisTooltipContent = {
        hide: (ev?: KeyboardEvent) => setVisible(undefined, { visible: false, documentKeyboardEvent: ev }),
      };

      context.visibleTooltip?.hide();
      context.visibleTooltip = thisTooltipContent;

      const onDocumentKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === Escape && !ev.defaultPrevented) {
          thisTooltipContent.hide(ev);
          // stop propagation to avoid conflicting with other elements that listen for `Escape`
          // e,g: Dialog, Popover, Menu and TooltipContent
          ev.preventDefault();
        }
      };

      targetDocument?.addEventListener('keydown', onDocumentKeyDown, {
        // As this event is added at targeted document,
        // we need to capture the event to be sure keydown handling from tooltip happens first
        capture: true,
      });

      return () => {
        if (context.visibleTooltip === thisTooltipContent) {
          context.visibleTooltip = undefined;
        }

        targetDocument?.removeEventListener('keydown', onDocumentKeyDown, { capture: true });
      };
    }
  }, [context, targetDocument, visible, setVisible]);

  const root = slot.always(
    getIntrinsicElementProps('div', {
      ref: useMergedRefs(ref, containerRef),
      ...props,
    }),
    {
      defaultProps: {
        role: 'tooltip',
      },
      elementType: 'div',
    },
  );

  // Cancel the hide timer when the mouse or focus enters the tooltip, and restart it when the mouse or focus leaves.
  // This keeps the tooltip visible when the mouse is moved over it, or it has focus within.
  root.onPointerEnter = mergeCallbacks(root.onPointerEnter, () => setPendingVisible(undefined));
  root.onPointerLeave = mergeCallbacks(root.onPointerLeave, ev =>
    setPendingVisible({ ev, data: { visible: false }, time: Date.now() + hideDelay }),
  );
  root.onFocus = mergeCallbacks(root.onFocus, () => setPendingVisible(undefined));
  root.onBlur = mergeCallbacks(root.onBlur, ev =>
    setPendingVisible({ ev, data: { visible: false }, time: Date.now() }),
  );

  let arrow = undefined;
  if (withArrow) {
    arrow = slot.always(props.arrow, { elementType: 'div' });
    arrow.ref = useMergedRefs(arrow.ref, arrowRef);
  }

  React.useImperativeHandle(
    props.imperativeHandle,
    () => ({
      setDelayedVisible: (ev, data, delay) => {
        setPendingVisible({ ev, data, time: Date.now() + delay });
      },
      cancelDelayedVisible: () => {
        setPendingVisible(undefined);
      },
      setTargetElement: (target: HTMLElement | undefined) => {
        targetRef.current = target;
      },
    }),
    [],
  );

  return {
    visible,
    shouldRender: visible || alwaysRender,
    appearance,
    mountNode,
    components: {
      root: 'div',
      arrow: 'div',
    },
    root,
    arrow,
  };
};
