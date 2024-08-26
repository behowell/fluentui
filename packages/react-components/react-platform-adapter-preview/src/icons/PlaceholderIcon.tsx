/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { html } from 'react-strict-dom';
import { PlaceholderIcon } from './PlaceholderIcon';

export const PlaceholderIcon: React.FC<any> = () => {
  return (
    <html.div
      style={
        {
          backgroundColor: 'pink',
          borderStyle: 'solid',
          borderColor: 'darkred',
          borderWidth: '1px',
          width: '12px',
          height: '12px',
        } as any
      }
    />
  );
};
