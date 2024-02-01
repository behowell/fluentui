import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { RadioItemSlots, RadioItemState } from './RadioItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const radioItemClassNames: SlotClassNames<RadioItemSlots> = {
  root: 'fui-RadioItem',
  indicator: 'fui-RadioItem__indicator',
  input: 'fui-RadioItem__input',
  label: 'fui-RadioItem__label',
};

// The indicator size is used by the indicator and label styles
const indicatorSize = '16px';

const useRootBaseClassName = makeResetStyles({
  display: 'inline-flex',
  position: 'relative',
  cursor: 'pointer',
  ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
});

const useRootStyles = makeStyles({
  disabled: {
    cursor: 'default',
  },

  vertical: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const useInputBaseClassName = makeResetStyles({
  position: 'absolute',
  left: 0,
  top: 0,
  width: `calc(${indicatorSize} + 2 * ${tokens.spacingHorizontalS})`,
  height: '100%',
  boxSizing: 'border-box',
  margin: 0,
  opacity: 0,
  cursor: 'inherit',
});

const useInputStyles = makeStyles({
  below: {
    width: '100%',
    height: `calc(${indicatorSize} + 2 * ${tokens.spacingVerticalS})`,
  },
});

const useIndicatorBaseClassName = makeResetStyles({
  position: 'relative',
  width: indicatorSize,
  height: indicatorSize,
  boxSizing: 'border-box',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  borderColor: tokens.colorNeutralStrokeAccessible,
  borderWidth: tokens.strokeWidthThin,
  borderStyle: 'solid',
  borderRadius: tokens.borderRadiusCircular,
  margin: tokens.spacingVerticalS + ' ' + tokens.spacingHorizontalS,
  pointerEvents: 'none',

  '::after': {
    position: 'absolute',
    width: indicatorSize,
    height: indicatorSize,
    borderRadius: 'inherit',
    // Use a transform to avoid pixel rounding errors at 125% DPI
    // https://github.com/microsoft/fluentui/issues/30025
    transform: 'scale(0.625)',
    backgroundColor: 'currentcolor',
    forcedColorAdjust: 'none',
  },

  '@media (forced-colors: active)': {
    color: 'ButtonText',
  },
});

const useIndicatorStyles = makeStyles({
  hover: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
  },

  active: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeAccessiblePressed),
  },

  checked: {
    '::after': {
      content: '""',
    },

    ...shorthands.borderColor(tokens.colorCompoundBrandStroke),
    color: tokens.colorCompoundBrandForeground1,
    '@media (forced-colors: active)': {
      color: 'Highlight',
    },
  },

  checkedHover: {
    ...shorthands.borderColor(tokens.colorCompoundBrandStrokeHover),
    color: tokens.colorCompoundBrandForeground1Hover,
  },

  checkedActive: {
    ...shorthands.borderColor(tokens.colorCompoundBrandStrokePressed),
    color: tokens.colorCompoundBrandForeground1Pressed,
  },

  disabled: {
    ...shorthands.borderColor(tokens.colorNeutralForegroundDisabled),
    color: tokens.colorNeutralForegroundDisabled,
    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },
});

const useLabelClassName = makeResetStyles({
  ...typographyStyles.body1,
  color: tokens.colorNeutralForeground3,
  alignSelf: 'center',
  padding: tokens.spacingVerticalS + ' ' + tokens.spacingHorizontalS,
});

// Can't use makeResetStyles here because Label is a component that may itself use makeResetStyles.
const useLabelStyles = makeStyles({
  hover: {
    color: tokens.colorNeutralForeground2,
  },

  active: {
    color: tokens.colorNeutralForeground1,
  },

  checked: {
    color: tokens.colorNeutralForeground1,
  },

  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },

  after: {
    paddingLeft: tokens.spacingHorizontalXS,

    // Use a (negative) margin to account for the difference between the indicator's height and the label's line height.
    // This prevents the label from expanding the height of the RadioItem, but preserves line height if the label wraps.
    marginTop: `calc((${indicatorSize} - ${tokens.lineHeightBase300}) / 2)`,
    marginBottom: `calc((${indicatorSize} - ${tokens.lineHeightBase300}) / 2)`,
  },

  below: {
    paddingTop: tokens.spacingVerticalXS,
    textAlign: 'center',
  },
});

/**
 * Apply styling to the RadioItem slots based on the state
 */
export const useRadioItemStyles_unstable = (state: RadioItemState) => {
  const { labelPosition, hover, active } = state;
  const { checked, disabled } = state.input;

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    radioItemClassNames.root,
    rootBaseClassName,
    labelPosition === 'below' && rootStyles.vertical,
    disabled && rootStyles.disabled,
    state.root.className,
  );

  const inputBaseClassName = useInputBaseClassName();
  const inputStyles = useInputStyles();
  state.input.className = mergeClasses(
    radioItemClassNames.input,
    inputBaseClassName,
    labelPosition === 'below' && inputStyles.below,
    state.input.className,
  );

  const indicatorBaseClassName = useIndicatorBaseClassName();
  const indicatorStyles = useIndicatorStyles();
  state.indicator.className = mergeClasses(
    radioItemClassNames.indicator,
    indicatorBaseClassName,
    hover && indicatorStyles.hover,
    active && indicatorStyles.active,
    checked && indicatorStyles.checked,
    checked && hover && indicatorStyles.checkedHover,
    checked && active && indicatorStyles.checkedActive,
    disabled && indicatorStyles.disabled,
    state.indicator.className,
  );

  const labelClassName = useLabelClassName();
  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      radioItemClassNames.label,
      labelClassName,
      labelStyles[labelPosition],
      hover && labelStyles.hover,
      active && labelStyles.active,
      checked && labelStyles.checked,
      disabled && labelStyles.disabled,
      state.label.className,
    );
  }
};
