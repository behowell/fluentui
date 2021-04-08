import * as React from 'react';
import {
  TooltipProvider,
  useTooltipSlot,
  useTooltipRef,
  WithTooltipSlot,
  Tooltip,
  toTooltipPlacement,
} from '@fluentui/react-tooltip';
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
import { resolveShorthandProps } from '@fluentui/react-utilities';
import { Button } from '@fluentui/react-button';
import { Checkbox } from '@fluentui/react';
import { makeStyles } from '@fluentui/react-make-styles';

const usePlacementTargetStyles = makeStyles({
  root: theme => ({
    width: '275px',
    height: '125px',
    boxSizing: 'border-box',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    padding: '20px',

    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.base[300],
    lineHeight: theme.global.type.lineHeights.base[300],

    background: theme.alias.color.neutral.neutralBackground3,
    color: theme.alias.color.neutral.neutralForeground3,
    border: `1px solid ${theme.alias.color.neutral.neutralStroke1}`,
  }),
});

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
      const { tooltip } = resolveShorthandProps(state, ['tooltip']);
      if (tooltip && !tooltip.children) {
        tooltip.children = state.name;
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
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <AvatarWithTooltip name="Example Person" />
        <AvatarWithTooltip tooltip="Tooltip text" />
        <AvatarWithTooltip
          tooltip={
            <>
              <u>Custom</u> <code>Tooltip</code> <b>content</b>!
            </>
          }
        />
        <AvatarWithTooltip
          tooltip={{
            placement: toTooltipPlacement('right', false),
            children:
              'This is a very long tooltip, which demonstrates what wrapped text looks like. ' +
              'It also is positioned so that it covers other elements, which is not usually a good idea. ' +
              'But hey, this is just an example.',
          }}
        />
        <AvatarWithTooltip tooltip={{ children: "This Tooltip doesn't have an arrow", noArrow: true }} />
        <AvatarWithTooltip
          tooltip={{
            children: 'This tooltip has a large offset from the target',
            placement: toTooltipPlacement('bottom', false),
            offset: 20,
          }}
        />
        <AvatarWithTooltip
          badge={{ state: 'success', ref: setBadgeElement } as BadgeProps}
          tooltip={{
            targetElement: badgeElement,
            placement: toTooltipPlacement('right', false),
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
          tooltip={{ placement: toTooltipPlacement('top-start', false) }}
        />
        <AvatarWithTooltip
          name="top"
          style={{ gridColumn: 3, gridRow: 1 }}
          tooltip={{ placement: toTooltipPlacement('top', false) }}
        />
        <AvatarWithTooltip
          name="top end"
          style={{ gridColumn: 4, gridRow: 1 }}
          tooltip={{ placement: toTooltipPlacement('top-end', false) }}
        />
        <AvatarWithTooltip
          name="left start"
          style={{ gridColumn: 1, gridRow: 2 }}
          tooltip={{ placement: toTooltipPlacement('left-start', false) }}
        />
        <AvatarWithTooltip
          name="left"
          style={{ gridColumn: 1, gridRow: 3 }}
          tooltip={{ placement: toTooltipPlacement('left', false) }}
        />
        <AvatarWithTooltip
          name="left end"
          style={{ gridColumn: 1, gridRow: 4 }}
          tooltip={{ placement: toTooltipPlacement('left-end', false) }}
        />
        <AvatarWithTooltip
          name="right start"
          style={{ gridColumn: 5, gridRow: 2 }}
          tooltip={{ placement: toTooltipPlacement('right-start', false) }}
        />
        <AvatarWithTooltip
          name="right"
          style={{ gridColumn: 5, gridRow: 3 }}
          tooltip={{ placement: toTooltipPlacement('right', false) }}
        />
        <AvatarWithTooltip
          name="right end"
          style={{ gridColumn: 5, gridRow: 4 }}
          tooltip={{ placement: toTooltipPlacement('right-end', false) }}
        />
        <AvatarWithTooltip
          name="bottom start"
          style={{ gridColumn: 2, gridRow: 5 }}
          tooltip={{ placement: toTooltipPlacement('bottom-start', false) }}
        />
        <AvatarWithTooltip
          name="bottom"
          style={{ gridColumn: 3, gridRow: 5 }}
          tooltip={{ placement: toTooltipPlacement('bottom', false) }}
        />
        <AvatarWithTooltip
          name="bottom end"
          style={{ gridColumn: 4, gridRow: 5 }}
          tooltip={{ placement: toTooltipPlacement('bottom-end', false) }}
        />
      </div>
      <div style={{ margin: '20px 0', padding: '40px 100px' }}>
        <div ref={setPlacementTarget} className={usePlacementTargetStyles().root}>
          This shows all of the possible placement values for tooltips relative to this box.
        </div>
        <Tooltip targetElement={placementTarget} subtle placement={toTooltipPlacement('left-start', false)}>
          left-start
        </Tooltip>
        <Tooltip targetElement={placementTarget} subtle placement={toTooltipPlacement('left', false)}>
          left
        </Tooltip>
        <Tooltip targetElement={placementTarget} subtle placement={toTooltipPlacement('left-end', false)}>
          left-end
        </Tooltip>
        <Tooltip targetElement={placementTarget} subtle placement={toTooltipPlacement('right-start', false)}>
          right-start
        </Tooltip>
        <Tooltip targetElement={placementTarget} subtle placement={toTooltipPlacement('right', false)}>
          right
        </Tooltip>
        <Tooltip targetElement={placementTarget} subtle placement={toTooltipPlacement('right-end', false)}>
          right-end
        </Tooltip>
        <Tooltip targetElement={placementTarget} subtle placement={toTooltipPlacement('top-start', false)}>
          top-start
        </Tooltip>
        <Tooltip targetElement={placementTarget} subtle placement={toTooltipPlacement('top', false)}>
          top
        </Tooltip>
        <Tooltip targetElement={placementTarget} subtle placement={toTooltipPlacement('top-end', false)}>
          top-end
        </Tooltip>
        <Tooltip targetElement={placementTarget} subtle placement={toTooltipPlacement('bottom-start', false)}>
          bottom-start
        </Tooltip>
        <Tooltip targetElement={placementTarget} subtle placement={toTooltipPlacement('bottom', false)}>
          bottom
        </Tooltip>
        <Tooltip targetElement={placementTarget} subtle placement={toTooltipPlacement('bottom-end', false)}>
          bottom-end
        </Tooltip>
      </div>
      <h1>Tooltips attached via ref</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
        <a href="http://example.com" ref={useTooltipRef('http://example.com')}>
          A native &lt;a&gt; link
        </a>
        <button
          ref={useTooltipRef(
            <>
              Tooltips on <u>anything</u>!
            </>,
          )}
        >
          A native &lt;button&gt;
        </button>
        <Button ref={useTooltipRef('Button from @fluentui/react-button')}>A &lt;Button&gt;</Button>
        <Checkbox ref={useTooltipRef('Checkbox from @fluentui/react')} label="A &lt;Checkbox&gt;" />
      </div>
    </div>
  );
};
