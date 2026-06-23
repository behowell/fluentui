import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { FileUpload } from './FileUpload';

describe('FileUpload', () => {
  isConformant({
    Component: FileUpload,
    displayName: 'FileUpload',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<FileUpload>Default FileUpload</FileUpload>);
    expect(result.container).toMatchSnapshot();
  });
});
