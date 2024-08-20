/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { html } from 'react-strict-dom';

export const PlaceholderIcon: React.FC<any> = () => {
  return (
    <html.div
      style={
        {
          backgroundColor: 'pink',
          borderStyle: 'solid',
          borderColor: 'orange',
          borderWidth: '1px',
          width: '12px',
          height: '12px',
        } as any
      }
    />
  );
};
