import { makeStyles, ax } from '@fluentui/react-make-styles';
import { TooltipState } from './Tooltip.types';
const animationDuration = {
  duration50: '50ms',
  duration100: '100ms',
  duration150: '150ms',
  duration200: '200ms',
  duration300: '300ms',
  duration400: '400ms',
  duration500: '500ms',
};

const animationTiming = {
  ultraFast: animationDuration.duration50,
  faster: animationDuration.duration100,
  fast: animationDuration.duration150,
  normal: animationDuration.duration200,
  slow: animationDuration.duration300,
  slower: animationDuration.duration400,
  ultraSlow: animationDuration.duration500,
};

const animationLines = {
  decelerateMax: 'cubic-bezier(0.00,0.00,0.00,1.00)',
  decelerateMid: 'cubic-bezier(0.10,0.90,0.20,1.00)',
  decelerateMin: 'cubic-bezier(0.33,0.00,0.10,1.00)',
  accelerateMax: 'cubic-bezier(1.00,0.00,1.00,1.00)',
  accelerateMid: 'cubic-bezier(0.90,0.10,1.00,0.20)',
  accelerateMin: 'cubic-bezier(0.80,0.00,0.78,1.00)',
  maxEasyEase: 'cubic-bezier(0.80,0.00,0.20,1.00)',
  easyEase: 'cubic-bezier(0.33,0.00,0.67,1.00)',
  linear: 'linear',
};

const animations = {
  fastOutSlowInMax: animationLines.decelerateMax,
  fastOutSlowInMid: animationLines.decelerateMid,
  fastOutSlowInMin: animationLines.decelerateMin,
  slowOutFastInMax: animationLines.accelerateMax,
  slowOutFastInMid: animationLines.accelerateMid,
  slowOutFastInMin: animationLines.accelerateMin,
  fastEase: animationLines.maxEasyEase,
  normalEase: animationLines.easyEase,
  nullEasing: animationLines.linear,
};

// ---

/**
 * The arrow is created by rotating a square by 45deg.
 * Need to multiply the final size [12, 6] by [cos(45deg), sin(45deg)] to get the initial size.
 */
export const arrowHeight = 6 * Math.SQRT1_2;
export const arrowSquareSize = 12 * Math.SQRT1_2;

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles<TooltipState>([
  [
    null,
    theme => ({
      position: 'absolute',
      padding: '5px 12px 7px 12px',
      maxWidth: '240px',
      fontFamily: theme.global.type.fontFamilies.base,
      fontSize: theme.global.type.fontSizes.base[200],
      lineHeight: theme.global.type.lineHeights.base[200],
      borderRadius: theme.global.borderRadius.medium,

      background: theme.alias.color.neutral.neutralForeground2, // TODO should be neutralBackgroundInverted
      color: theme.alias.color.neutral.neutralForegroundInverted,

      filter: theme.alias.shadow.shadowFilter8,

      // transition: `transform ${animationTiming.normal} ${animations.fastEase}`,
      transitionProperty: 'width, height',
      transitionDuration: animationTiming.normal,
      transitionTimingFunction: animations.fastEase,
    }),
  ],

  [
    s => s.subtle,
    theme => ({
      background: theme.alias.color.neutral.neutralBackground1,
      color: theme.alias.color.neutral.neutralForeground1,
    }),
  ],
]);

const startsWith = (str: string, start: string) => str.substring(0, start.length) === start;

const useArrowStyles = makeStyles<TooltipState>([
  [
    null,
    theme => ({
      position: 'absolute',
      width: `${arrowSquareSize}px`,
      height: `${arrowSquareSize}px`,
      background: 'inherit',
      visibility: 'hidden',

      ':before': {
        content: '""',
        position: 'absolute',
        width: 'inherit',
        height: 'inherit',
        background: 'inherit',
        visibility: 'visible',
        borderBottomRightRadius: theme.global.borderRadius.small,
      },
    }),
  ],
  [s => startsWith(s.placement, 'top'), { bottom: `-${arrowHeight}px`, ':before': { transform: 'rotate(45deg)' } }],
  [s => startsWith(s.placement, 'bottom'), { top: `-${arrowHeight}px`, ':before': { transform: 'rotate(225deg)' } }],
  [s => startsWith(s.placement, 'left'), { right: `-${arrowHeight}px`, ':before': { transform: 'rotate(315deg)' } }],
  [s => startsWith(s.placement, 'right'), { left: `-${arrowHeight}px`, ':before': { transform: 'rotate(135deg)' } }],
]);

/**
 * Apply styling to the Tooltip slots based on the state
 * {@docCategory Tooltip}
 */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
  state.className = ax(useRootStyles(state), state.className);

  const arrowClassName = useArrowStyles(state);
  if (state.arrow) {
    state.arrow.className = ax(arrowClassName, state.arrow.className);
  }

  return state;
};
