/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

export type StoryProps = {
  title: string;
  story: React.ReactNode;
};

export const Story = ({ title, story }: StoryProps) => (
  <div>
    <b>{title}</b>
    <div style={{ display: 'flex', gap: '20px', margin: '20px' }}>{story}</div>
    <br />
  </div>
);
