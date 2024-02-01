import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { RadioItem } from './RadioItem';

describe('RadioItem', () => {
  isConformant({
    Component: RadioItem,
    displayName: 'RadioItem',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<RadioItem>Default RadioItem</RadioItem>);
    expect(result.container).toMatchSnapshot();
  });
});
