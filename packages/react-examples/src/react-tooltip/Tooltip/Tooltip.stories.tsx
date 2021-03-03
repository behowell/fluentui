import * as React from 'react';
import { TooltipProvider, useTooltipSlot, useTooltipRef, WithTooltipSlot, Tooltip } from '@fluentui/react-tooltip';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { AvatarProps, Badge, BadgeProps, renderAvatar, useAvatar, useAvatarStyles } from '@fluentui/react-avatar';

type AvatarWithTooltipProps = AvatarProps & WithTooltipSlot;

const AvatarWithTooltip = React.forwardRef((props: AvatarWithTooltipProps, ref: React.Ref<HTMLElement>) => {
  const state = useAvatar(props, ref, {
    badge: { as: props.badge ? Badge : () => null },
    tabIndex: 0,
  });

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
  const [parentDiv, setParentDiv] = React.useState<HTMLElement | null>(null);
  const [badgeElement, setBadgeElement] = React.useState<HTMLElement | null>(null);

  return (
    <div>
      <div>
        <Tooltip>Tooltip text</Tooltip>
      </div>
      <div>
        <AvatarWithTooltip style={{ margin: '10px' }} tooltip="Simple tooltip" />
        <AvatarWithTooltip
          style={{ margin: '10px' }}
          tooltip="This is a very long tooltip, which is hopefully long enough to wrap around"
        />
        <AvatarWithTooltip
          style={{ margin: '10px' }}
          tooltip={{
            noArrow: true,
            children: (
              <>
                This <u>Tooltip</u> doesn't have an arrow
              </>
            ),
          }}
        />
        <div style={{ background: 'pink', padding: '10px', display: 'inline-block' }} ref={setParentDiv}>
          <AvatarWithTooltip
            style={{ margin: '10px' }}
            tooltip={{
              targetElement: parentDiv,
              placement: 'top-end',
              children: 'This tooltip targets the parent div',
            }}
          />
        </div>
        <AvatarWithTooltip
          style={{ margin: '10px' }}
          badge={{ state: 'success', ref: setBadgeElement } as BadgeProps}
          tooltip={{
            targetElement: badgeElement,
            placement: 'right',
            children: 'This tooltip targets the badge',
          }}
        />
      </div>
      <div>
        <AvatarWithTooltip style={{ margin: '10px' }} tooltip={{ children: 'Hello world', placement: 'left-end' }} />
        <AvatarWithTooltip
          style={{ margin: '10px' }}
          tooltip={{ children: 'Hello world', placement: 'top-end', subtle: true }}
        />
        <AvatarWithTooltip style={{ margin: '10px' }} tooltip={{ children: 'Hello world', placement: 'right-start' }} />
        <AvatarWithTooltip
          style={{ margin: '10px' }}
          tooltip={{ children: 'Hello world', placement: 'bottom-start' }}
        />
      </div>
      <div
        style={{ background: 'lightgray' }}
        ref={useTooltipRef({ children: 'The tooltip for the div', placement: 'bottom-start' })}
      >
        This div has a tooltip
      </div>
      <div
        style={{ background: 'alicewhite' }}
        ref={useTooltipRef(
          <>
            Tooltips <u>everywhere</u>!
          </>,
        )}
      >
        This div has a styled tooltip
      </div>
    </div>
  );
};
