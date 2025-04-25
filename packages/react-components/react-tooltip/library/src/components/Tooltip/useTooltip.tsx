import * as React from 'react';
import { resolvePositioningShorthand } from '@fluentui/react-positioning';
import {
  useTooltipVisibility_unstable as useTooltipVisibility,
  useFluent_unstable as useFluent,
} from '@fluentui/react-shared-contexts';
import type { KeyborgFocusInEvent } from '@fluentui/react-tabster';
import { KEYBORG_FOCUSIN, useIsNavigatingWithKeyboard } from '@fluentui/react-tabster';
import {
  applyTriggerPropsToChildren,
  useId,
  useIsSSR,
  useMergedRefs,
  getTriggerChild,
  mergeCallbacks,
  useEventCallback,
  slot,
} from '@fluentui/react-utilities';
import type { TooltipProps, TooltipState, TooltipChildProps } from './Tooltip.types';
import { TooltipContentImperativeHandle } from '../TooltipContent/TooltipContent.types';
import { TooltipContent } from '../TooltipContent/TooltipContent';

/**
 * Create the state required to render Tooltip.
 *
 * The returned state can be modified with hooks such as useTooltipStyles_unstable,
 * before being passed to renderTooltip_unstable.
 *
 * @param props - props from this instance of Tooltip
 */
export const useTooltip_unstable = (props: TooltipProps): TooltipState => {
  'use no memo';

  const context = useTooltipVisibility();
  const isServerSideRender = useIsSSR();
  const { targetDocument } = useFluent();

  const {
    appearance = 'normal',
    children,
    withArrow = false,
    positioning = 'above',
    onVisibleChange,
    relationship,
    showDelay = 250,
    hideDelay = 250,
    mountNode,
  } = props;

  const { targetRef, tooltipContentRef } = React.useMemo(() => {
    type RefCallbackObject<T> = React.RefCallback<T> & React.MutableRefObject<T | undefined>;

    const tooltipContentRef = (tooltipContent => {
      tooltipContentRef.current = tooltipContent || undefined;
      tooltipContentRef.current?.setTargetElement(targetRef.current);
    }) as RefCallbackObject<TooltipContentImperativeHandle>;

    const targetRef = (newTarget => {
      targetRef.current = newTarget || undefined;
      tooltipContentRef.current?.setTargetElement(targetRef.current);
    }) as RefCallbackObject<HTMLElement>;

    return {
      targetRef,
      tooltipContentRef,
    };
  }, []);

  const content = slot.always(props.content, {
    defaultProps: {
      role: 'tooltip',
      id: useId('tooltip-'),
      imperativeHandle: tooltipContentRef,
      appearance,
      hideDelay,
      mountNode,
      onVisibleChange,
      positioning,
      showDelay,
      visible: props.visible,
      withArrow,
    },
    elementType: TooltipContent,
  });

  const state: TooltipState = {
    withArrow,
    positioning,
    showDelay,
    hideDelay,
    relationship,
    visible: false,
    shouldRenderTooltip: true,
    appearance,
    mountNode,
    // Slots
    components: {
      content: TooltipContent,
    },
    content,
  };

  // Used to skip showing the tooltip in certain situations when the trigger is focused.
  // See comments where this is set for more info.
  const ignoreNextFocusEventRef = React.useRef(false);

  // Listener for onPointerEnter and onFocus on the trigger element
  const onEnterTrigger = React.useCallback(
    (ev: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      if (ev.type === 'focus' && ignoreNextFocusEventRef.current) {
        ignoreNextFocusEventRef.current = false;
        return;
      }

      // Show immediately if another tooltip is already visible
      const delay = context.visibleTooltip ? 0 : showDelay;
      tooltipContentRef.current?.setDelayedVisible(ev, { visible: true }, delay);

      ev.persist(); // Persist the event since the setVisible call will happen asynchronously
    },
    [tooltipContentRef, showDelay, context],
  );

  const isNavigatingWithKeyboard = useIsNavigatingWithKeyboard();

  // Callback ref that attaches a keyborg:focusin event listener.
  const [keyborgListenerCallbackRef] = React.useState(() => {
    const onKeyborgFocusIn = ((ev: KeyborgFocusInEvent) => {
      // Skip showing the tooltip if focus moved programmatically.
      // For example, we don't want to show the tooltip when a dialog is closed
      // and Tabster programmatically restores focus to the trigger button.
      // See https://github.com/microsoft/fluentui/issues/27576
      if (ev.detail?.isFocusedProgrammatically && !isNavigatingWithKeyboard()) {
        ignoreNextFocusEventRef.current = true;
      }
    }) as EventListener;

    // Save the current element to remove the listener when the ref changes
    let current: Element | null = null;

    // Callback ref that attaches the listener to the element
    return (element: Element | null) => {
      current?.removeEventListener(KEYBORG_FOCUSIN, onKeyborgFocusIn);
      element?.addEventListener(KEYBORG_FOCUSIN, onKeyborgFocusIn);
      current = element;
    };
  });

  // Listener for onPointerLeave and onBlur on the trigger element
  const onLeaveTrigger = React.useCallback(
    (ev: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      let delay = hideDelay;

      if (ev.type === 'blur') {
        // Hide immediately when losing focus
        delay = 0;

        // The focused element gets a blur event when the document loses focus
        // (e.g. switching tabs in the browser), but we don't want to show the
        // tooltip again when the document gets focus back. Handle this case by
        // checking if the blurred element is still the document's activeElement.
        // See https://github.com/microsoft/fluentui/issues/13541
        ignoreNextFocusEventRef.current = targetDocument?.activeElement === ev.target;
      }

      tooltipContentRef.current?.setDelayedVisible(ev, { visible: false }, delay);

      ev.persist(); // Persist the event since the setVisible call will happen asynchronously
    },
    [tooltipContentRef, hideDelay, targetDocument],
  );

  const child = getTriggerChild(children);

  const triggerAriaProps: Pick<TooltipChildProps, 'aria-label' | 'aria-labelledby' | 'aria-describedby'> = {};
  const isExpanded = child?.props?.['aria-expanded'] === true || child?.props?.['aria-expanded'] === 'true';

  if (relationship === 'label') {
    // aria-label only works if the content is a string. Otherwise, need to use aria-labelledby.
    if (typeof state.content.children === 'string') {
      triggerAriaProps['aria-label'] = state.content.children;
    } else {
      triggerAriaProps['aria-labelledby'] = state.content.id;
      // Always render the tooltip even if hidden, so that aria-labelledby refers to a valid element
      state.content.alwaysRender = true;
    }
  } else if (relationship === 'description') {
    triggerAriaProps['aria-describedby'] = state.content.id;
    // Always render the tooltip even if hidden, so that aria-describedby refers to a valid element
    state.content.alwaysRender = true;
  }

  // Case 1: Don't render the Tooltip in SSR to avoid hydration errors
  // Case 2: Don't render the Tooltip, if it triggers Menu and it's already opened
  if (isServerSideRender || isExpanded) {
    state.shouldRenderTooltip = false;
  }

  // Apply the trigger props to the child, either by calling the render function, or cloning with the new props
  state.children = applyTriggerPropsToChildren(children, {
    ...triggerAriaProps,
    ...child?.props,
    ref: useMergedRefs(
      child?.ref,
      keyborgListenerCallbackRef,
      // If the target prop is not provided, attach targetRef to the trigger element's ref prop
      resolvePositioningShorthand(props.positioning).target === undefined ? targetRef : undefined,
    ),
    onPointerEnter: useEventCallback(mergeCallbacks(child?.props?.onPointerEnter, onEnterTrigger)),
    onPointerLeave: useEventCallback(mergeCallbacks(child?.props?.onPointerLeave, onLeaveTrigger)),
    onFocus: useEventCallback(mergeCallbacks(child?.props?.onFocus, onEnterTrigger)),
    onBlur: useEventCallback(mergeCallbacks(child?.props?.onBlur, onLeaveTrigger)),
  });

  return state;
};
