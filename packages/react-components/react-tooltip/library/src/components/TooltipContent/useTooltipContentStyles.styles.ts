import { makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import { createArrowStyles } from '@fluentui/react-positioning';
import { tokens } from '@fluentui/react-theme';
import { arrowHeight } from './private/constants';
import type { TooltipContentSlots, TooltipContentState } from './TooltipContent.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tooltipContentClassNames: SlotClassNames<TooltipContentSlots> = {
  root: 'fui-TooltipContent__root',
  arrow: 'fui-TooltipContent__arrow',
};

const useRootBaseClassName = makeResetStyles({
  display: 'none',
  boxSizing: 'border-box',
  maxWidth: '240px',
  cursor: 'default',
  fontFamily: tokens.fontFamilyBase,
  fontSize: tokens.fontSizeBase200,
  lineHeight: tokens.lineHeightBase200,
  overflowWrap: 'break-word',
  borderRadius: tokens.borderRadiusMedium,
  border: `1px solid ${tokens.colorTransparentStroke}`,
  padding: '4px 11px 6px 11px', // '5px 12px 7px 12px' minus the border width '1px'
  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,

  // TODO need to add versions of tokens.alias.shadow.shadow8, etc. that work with filter
  filter:
    `drop-shadow(0 0 2px ${tokens.colorNeutralShadowAmbient}) ` +
    `drop-shadow(0 4px 8px ${tokens.colorNeutralShadowKey})`,
});

const useRootStyles = makeStyles({
  visible: {
    display: 'block',
  },

  inverted: {
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    color: tokens.colorNeutralForegroundStaticInverted,
  },
});

const useArrowBaseClassName = makeResetStyles(createArrowStyles({ arrowHeight }));

/**
 * Apply styling to the TooltipContent slots based on the state
 */
export const useTooltipContentStyles_unstable = (state: TooltipContentState): TooltipContentState => {
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();

  state.root.className = mergeClasses(
    tooltipContentClassNames.root,
    rootBaseClassName,
    state.appearance === 'inverted' && rootStyles.inverted,
    state.visible && rootStyles.visible,
    state.root.className,
  );

  const arrowBaseClassName = useArrowBaseClassName();
  if (state.arrow) {
    state.arrow.className = mergeClasses(tooltipContentClassNames.arrow, arrowBaseClassName, state.arrow.className);
  }

  return state;
};
