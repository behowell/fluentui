import * as React from 'react';
import { TooltipManager } from './TooltipManager';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('TooltipManager', () => {
  isConformant({
    Component: TooltipManager,
    displayName: 'TooltipManager',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for TooltipManager in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<TooltipManager>Default TooltipManager</TooltipManager>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
