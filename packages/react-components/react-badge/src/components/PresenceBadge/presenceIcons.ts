import * as React from 'react';
import {
  PlaceholderIcon as PresenceAvailable10Regular,
  PlaceholderIcon as PresenceAvailable12Regular,
  PlaceholderIcon as PresenceAvailable16Regular,
  PlaceholderIcon as PresenceAvailable20Regular,
  PlaceholderIcon as PresenceAvailable10Filled,
  PlaceholderIcon as PresenceAvailable12Filled,
  PlaceholderIcon as PresenceAvailable16Filled,
  PlaceholderIcon as PresenceAvailable20Filled,
  PlaceholderIcon as PresenceAway10Regular,
  PlaceholderIcon as PresenceAway12Regular,
  PlaceholderIcon as PresenceAway16Regular,
  PlaceholderIcon as PresenceAway20Regular,
  PlaceholderIcon as PresenceAway10Filled,
  PlaceholderIcon as PresenceAway12Filled,
  PlaceholderIcon as PresenceAway16Filled,
  PlaceholderIcon as PresenceAway20Filled,
  PlaceholderIcon as PresenceBlocked10Regular,
  PlaceholderIcon as PresenceBlocked12Regular,
  PlaceholderIcon as PresenceBlocked16Regular,
  PlaceholderIcon as PresenceBlocked20Regular,
  PlaceholderIcon as PresenceBusy10Filled,
  PlaceholderIcon as PresenceBusy12Filled,
  PlaceholderIcon as PresenceBusy16Filled,
  PlaceholderIcon as PresenceBusy20Filled,
  PlaceholderIcon as PresenceDnd10Regular,
  PlaceholderIcon as PresenceDnd12Regular,
  PlaceholderIcon as PresenceDnd16Regular,
  PlaceholderIcon as PresenceDnd20Regular,
  PlaceholderIcon as PresenceDnd10Filled,
  PlaceholderIcon as PresenceDnd12Filled,
  PlaceholderIcon as PresenceDnd16Filled,
  PlaceholderIcon as PresenceDnd20Filled,
  PlaceholderIcon as PresenceOof10Regular,
  PlaceholderIcon as PresenceOof12Regular,
  PlaceholderIcon as PresenceOof16Regular,
  PlaceholderIcon as PresenceOof20Regular,
  PlaceholderIcon as PresenceOffline10Regular,
  PlaceholderIcon as PresenceOffline12Regular,
  PlaceholderIcon as PresenceOffline16Regular,
  PlaceholderIcon as PresenceOffline20Regular,
  PlaceholderIcon as PresenceUnknown10Regular,
  PlaceholderIcon as PresenceUnknown12Regular,
  PlaceholderIcon as PresenceUnknown16Regular,
  PlaceholderIcon as PresenceUnknown20Regular,
} from './PlaceholderIcon';
import type { PresenceBadgeState } from './PresenceBadge.types';

export const presenceAwayRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceAway10Regular,
  'extra-small': PresenceAway10Regular,
  small: PresenceAway12Regular,
  medium: PresenceAway16Regular,
  large: PresenceAway20Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceAway20Regular,
};

export const presenceAwayFilled: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceAway10Filled,
  'extra-small': PresenceAway10Filled,
  small: PresenceAway12Filled,
  medium: PresenceAway16Filled,
  large: PresenceAway20Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceAway20Filled,
};

export const presenceAvailableRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceAvailable10Regular,
  'extra-small': PresenceAvailable10Regular,
  small: PresenceAvailable12Regular,
  medium: PresenceAvailable16Regular,
  large: PresenceAvailable20Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceAvailable20Regular,
};

export const presenceAvailableFilled: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceAvailable10Filled,
  'extra-small': PresenceAvailable10Filled,
  small: PresenceAvailable12Filled,
  medium: PresenceAvailable16Filled,
  large: PresenceAvailable20Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceAvailable20Filled,
};

export const presenceBlockedRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceBlocked10Regular,
  'extra-small': PresenceBlocked10Regular,
  small: PresenceBlocked12Regular,
  medium: PresenceBlocked16Regular,
  large: PresenceBlocked20Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceBlocked20Regular,
};

export const presenceBusyFilled: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceBusy10Filled,
  'extra-small': PresenceBusy10Filled,
  small: PresenceBusy12Filled,
  medium: PresenceBusy16Filled,
  large: PresenceBusy20Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceBusy20Filled,
};

export const presenceDndFilled: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceDnd10Filled,
  'extra-small': PresenceDnd10Filled,
  small: PresenceDnd12Filled,
  medium: PresenceDnd16Filled,
  large: PresenceDnd20Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceDnd20Filled,
};

export const presenceDndRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceDnd10Regular,
  'extra-small': PresenceDnd10Regular,
  small: PresenceDnd12Regular,
  medium: PresenceDnd16Regular,
  large: PresenceDnd20Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceDnd20Regular,
};

export const presenceOofRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceOof10Regular,
  'extra-small': PresenceOof10Regular,
  small: PresenceOof12Regular,
  medium: PresenceOof16Regular,
  large: PresenceOof20Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceOof20Regular,
};

export const presenceOfflineRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceOffline10Regular,
  'extra-small': PresenceOffline10Regular,
  small: PresenceOffline12Regular,
  medium: PresenceOffline16Regular,
  large: PresenceOffline20Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceOffline20Regular,
};

export const presenceUnknownRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceUnknown10Regular,
  'extra-small': PresenceUnknown10Regular,
  small: PresenceUnknown12Regular,
  medium: PresenceUnknown16Regular,
  large: PresenceUnknown20Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceUnknown20Regular,
};
