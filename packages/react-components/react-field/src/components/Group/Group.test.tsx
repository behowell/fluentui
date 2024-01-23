import * as React from 'react';

import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Group } from './Group';

describe('Group', () => {
  isConformant({
    Component: Group,
    displayName: 'Group',
  });

  it('renders a default state', () => {
    const { getByRole } = render(<Group />);
    expect(getByRole('group')).toBeTruthy();
  });
});
