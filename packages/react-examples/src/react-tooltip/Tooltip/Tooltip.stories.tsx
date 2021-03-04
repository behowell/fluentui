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
  <div style={{ padding: '100px' }}>
    <ThemeProvider theme={webLightTheme}>
      <TooltipProvider>
        <TooltipExampleCore />
      </TooltipProvider>
    </ThemeProvider>
  </div>
);

const TooltipExampleCore = () => {
  const [redBox, setRedBox] = React.useState<HTMLElement | null>(null);
  const [exampleTarget, setExampleTarget] = React.useState<HTMLElement | null>(null);
  const [sectionHeader, setSectionHeader] = React.useState<HTMLElement | null>(null);
  const [badgeElement, setBadgeElement] = React.useState<HTMLElement | null>(null);

  return (
    <div>
      <h1>Basic tooltips</h1>
      <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
        <Tooltip>Tooltip</Tooltip>
        <Tooltip subtle>Subtle</Tooltip>
        <Tooltip noArrow>No arrow</Tooltip>
      </div>
      <h1>Tooltip placement</h1>
      <div style={{ margin: '20px 0', padding: '40px 100px' }}>
        <div
          ref={setRedBox}
          style={{ width: '275px', height: '125px', background: 'lightgray', border: '1px solid darkgray' }}
        />
        <Tooltip targetElement={redBox} placement="left-start">
          left-start
        </Tooltip>
        <Tooltip targetElement={redBox} placement="left">
          left
        </Tooltip>
        <Tooltip targetElement={redBox} placement="left-end">
          left-end
        </Tooltip>
        <Tooltip targetElement={redBox} placement="right-start">
          right-start
        </Tooltip>
        <Tooltip targetElement={redBox} placement="right">
          right
        </Tooltip>
        <Tooltip targetElement={redBox} placement="right-end">
          right-end
        </Tooltip>
        <Tooltip targetElement={redBox} placement="top-start">
          top-start
        </Tooltip>
        <Tooltip targetElement={redBox} placement="top">
          top
        </Tooltip>
        <Tooltip targetElement={redBox} placement="top-end">
          top-end
        </Tooltip>
        <Tooltip targetElement={redBox} placement="bottom-start">
          bottom-start
        </Tooltip>
        <Tooltip targetElement={redBox} placement="bottom">
          bottom
        </Tooltip>
        <Tooltip targetElement={redBox} placement="bottom-end">
          bottom-end
        </Tooltip>
      </div>
      <h1 ref={setSectionHeader}>Simple tooltips</h1>
      <div style={{ display: 'flex', gap: '10px', margin: '20px' }}>
        <AvatarWithTooltip tooltip="Basic tooltip" />
        <AvatarWithTooltip
          // eslint-disable-next-line @fluentui/max-len
          tooltip="This is a very long tooltip, which is hopefully long enough to wrap around to more than one line of text in the tooltip. This demonstrates what a wrapped tooltip looks like."
        />
        <AvatarWithTooltip
          tooltip={{
            noArrow: true,
            children: (
              <>
                This <u>Tooltip</u> doesn't have an arrow
              </>
            ),
          }}
        />
        <AvatarWithTooltip
          tooltip={{
            targetElement: sectionHeader,
            placement: 'bottom-start',
            children: 'This tooltip targets the section header',
          }}
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
      <div style={{ display: 'inline-grid', gap: '5px', margin: '20px' }}>
        <AvatarWithTooltip
          size={48}
          name="top start"
          style={{ gridColumn: 2, gridRow: 1 }}
          tooltip={{ placement: 'top-start' }}
        />
        <AvatarWithTooltip size={48} name="top" style={{ gridColumn: 3, gridRow: 1 }} tooltip={{ placement: 'top' }} />
        <AvatarWithTooltip
          size={48}
          name="top end"
          style={{ gridColumn: 4, gridRow: 1 }}
          tooltip={{ placement: 'top-end' }}
        />
        <AvatarWithTooltip
          size={48}
          name="left start"
          style={{ gridColumn: 1, gridRow: 2 }}
          tooltip={{ placement: 'left-start' }}
        />
        <AvatarWithTooltip
          size={48}
          name="right start"
          style={{ gridColumn: 5, gridRow: 2 }}
          tooltip={{ placement: 'right-start' }}
        />
        <AvatarWithTooltip
          size={48}
          name="left"
          style={{ gridColumn: 1, gridRow: 3 }}
          tooltip={{ placement: 'left' }}
        />
        <AvatarWithTooltip
          size={48}
          name="right"
          style={{ gridColumn: 5, gridRow: 3 }}
          tooltip={{ placement: 'right' }}
        />
        <AvatarWithTooltip
          size={48}
          name="left end"
          style={{ gridColumn: 1, gridRow: 4 }}
          tooltip={{ placement: 'left-end' }}
        />
        <AvatarWithTooltip
          size={48}
          name="right end"
          style={{ gridColumn: 5, gridRow: 4 }}
          tooltip={{ placement: 'right-end' }}
        />
        <AvatarWithTooltip
          size={48}
          name="bottom start"
          style={{ gridColumn: 2, gridRow: 5 }}
          tooltip={{ placement: 'bottom-start' }}
        />
        <AvatarWithTooltip
          size={48}
          name="bottom"
          style={{ gridColumn: 3, gridRow: 5 }}
          tooltip={{ placement: 'bottom' }}
        />
        <AvatarWithTooltip
          size={48}
          name="bottom end"
          style={{ gridColumn: 4, gridRow: 5 }}
          tooltip={{ placement: 'bottom-end' }}
        />
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
