import * as React from 'react';
import { TooltipProvider, useTooltipSlot, useTooltipRef, WithTooltipSlot, Tooltip } from '@fluentui/react-tooltip';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { webLightTheme } from '@fluentui/react-theme';
import {
  AvatarProps,
  AvatarState,
  Badge,
  BadgeProps,
  renderAvatar,
  useAvatar,
  useAvatarStyles,
} from '@fluentui/react-avatar';
import { resolveShorthandProp } from '@fluentui/react-utilities';

type AvatarWithTooltipProps = AvatarProps & WithTooltipSlot;
type AvatarWithTooltipState = AvatarState & WithTooltipSlot;

const AvatarWithTooltip = React.forwardRef((props: AvatarWithTooltipProps, ref: React.RefObject<HTMLElement>) => {
  const state = useAvatar(props, ref, {
    badge: { as: props.badge ? Badge : () => null },
    tabIndex: 0,
  }) as AvatarWithTooltipState;

  if (state.name) {
    if (!state.tooltip) {
      state.tooltip = state.name;
    } else {
      state.tooltip = resolveShorthandProp(state.tooltip);
      if (!state.tooltip.children) {
        state.tooltip.children = state.name;
      }
    }
  }

  useTooltipSlot(state);
  useAvatarStyles(state);

  return renderAvatar(state);
});

export const TooltipExample = () => (
  <ThemeProvider theme={webLightTheme}>
    <TooltipProvider>
      <TooltipExampleCore />
    </TooltipProvider>
  </ThemeProvider>
);

const TooltipExampleCore = () => {
  const [placementTarget, setPlacementTarget] = React.useState<HTMLElement | null>(null);
  const [redBox, setRedBox] = React.useState<HTMLElement | null>(null);
  const [badgeElement, setBadgeElement] = React.useState<HTMLElement | null>(null);

  return (
    <div>
      <h1>Basic tooltips</h1>
      <div>Normally tooltips aren't rendered on their own like this, but this shows what they look like:</div>
      <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
        <Tooltip>Default</Tooltip>
        <Tooltip noArrow>No arrow</Tooltip>
        <Tooltip subtle>Subtle</Tooltip>
      </div>
      <h1>Triggered tooltips</h1>
      <div style={{ display: 'flex', gap: '10px', margin: '20px' }}>
        <AvatarWithTooltip name="Example Person" />
        <AvatarWithTooltip tooltip="Tooltip text" />
        <AvatarWithTooltip
          tooltip={
            <>
              <i>Custom</i>
              <code>
                <u>Tooltip</u>
              </code>
              content!
            </>
          }
        />
        <AvatarWithTooltip
          tooltip={{
            placement: 'right',
            children:
              'This is a very long tooltip, which is hopefully long enough to wrap around to more than one line ' +
              'of text in the tooltip. This demonstrates what a wrapped tooltip looks like.',
          }}
        />
        <AvatarWithTooltip tooltip={{ children: "This Tooltip doesn't have an arrow", noArrow: true }} />
        <AvatarWithTooltip
          tooltip={{ children: 'This tooltip has a large offset from the target', placement: 'bottom', offset: 20 }}
        />
        <AvatarWithTooltip
          badge={{ state: 'success', ref: setBadgeElement } as BadgeProps}
          tooltip={{
            targetElement: badgeElement,
            placement: 'right',
            children: 'This tooltip targets the badge',
            subtle: true,
          }}
        />
      </div>
      <h1>Tooltip placement</h1>
      <div style={{ display: 'inline-grid', gap: '5px', margin: '20px 100px' }}>
        <AvatarWithTooltip
          name="top start"
          style={{ gridColumn: 2, gridRow: 1 }}
          tooltip={{ placement: 'top-start' }}
        />
        <AvatarWithTooltip name="top" style={{ gridColumn: 3, gridRow: 1 }} tooltip={{ placement: 'top' }} />
        <AvatarWithTooltip name="top end" style={{ gridColumn: 4, gridRow: 1 }} tooltip={{ placement: 'top-end' }} />
        <AvatarWithTooltip
          name="left start"
          style={{ gridColumn: 1, gridRow: 2 }}
          tooltip={{ placement: 'left-start' }}
        />
        <AvatarWithTooltip name="left" style={{ gridColumn: 1, gridRow: 3 }} tooltip={{ placement: 'left' }} />
        <AvatarWithTooltip name="left end" style={{ gridColumn: 1, gridRow: 4 }} tooltip={{ placement: 'left-end' }} />
        <AvatarWithTooltip
          name="right start"
          style={{ gridColumn: 5, gridRow: 2 }}
          tooltip={{ placement: 'right-start' }}
        />
        <AvatarWithTooltip name="right" style={{ gridColumn: 5, gridRow: 3 }} tooltip={{ placement: 'right' }} />
        <AvatarWithTooltip
          name="right end"
          style={{ gridColumn: 5, gridRow: 4 }}
          tooltip={{ placement: 'right-end' }}
        />
        <AvatarWithTooltip
          name="bottom start"
          style={{ gridColumn: 2, gridRow: 5 }}
          tooltip={{ placement: 'bottom-start' }}
        />
        <AvatarWithTooltip name="bottom" style={{ gridColumn: 3, gridRow: 5 }} tooltip={{ placement: 'bottom' }} />
        <AvatarWithTooltip
          name="bottom end"
          style={{ gridColumn: 4, gridRow: 5 }}
          tooltip={{ placement: 'bottom-end' }}
        />
      </div>
      <div style={{ margin: '20px 0', padding: '40px 100px' }}>
        <div
          ref={setPlacementTarget}
          style={{
            width: '275px',
            height: '125px',
            boxSizing: 'border-box',
            background: '#DDD',
            color: '#222',
            border: '1px solid #555',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          This shows all of the possible placement values for tooltips relative to this box.
        </div>
        <Tooltip targetElement={placementTarget} placement="left-start">
          left-start
        </Tooltip>
        <Tooltip targetElement={placementTarget} placement="left">
          left
        </Tooltip>
        <Tooltip targetElement={placementTarget} placement="left-end">
          left-end
        </Tooltip>
        <Tooltip targetElement={placementTarget} placement="right-start">
          right-start
        </Tooltip>
        <Tooltip targetElement={placementTarget} placement="right">
          right
        </Tooltip>
        <Tooltip targetElement={placementTarget} placement="right-end">
          right-end
        </Tooltip>
        <Tooltip targetElement={placementTarget} placement="top-start">
          top-start
        </Tooltip>
        <Tooltip targetElement={placementTarget} placement="top">
          top
        </Tooltip>
        <Tooltip targetElement={placementTarget} placement="top-end">
          top-end
        </Tooltip>
        <Tooltip targetElement={placementTarget} placement="bottom-start">
          bottom-start
        </Tooltip>
        <Tooltip targetElement={placementTarget} placement="bottom">
          bottom
        </Tooltip>
        <Tooltip targetElement={placementTarget} placement="bottom-end">
          bottom-end
        </Tooltip>
      </div>
      <div style={{ padding: '10px' }}>
        <a href="http://example.com" ref={useTooltipRef('http://example.com')}>
          This &lt;a&gt; has a tooltip
        </a>
      </div>
      <div style={{ padding: '10px' }}>
        <button
          ref={useTooltipRef(
            <>
              Tooltips <u>everywhere</u>!
            </>,
          )}
        >
          This &lt;button&gt; has a styled tooltip
        </button>
      </div>
    </div>
  );
};
