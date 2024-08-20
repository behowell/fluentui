/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { Persona } from '@fluentui/react-persona';
import { makeStyles } from '@fluentui/react-platform-adapter-preview';

export const Default = () => {
  return (
    <Persona
      name="Kevin Sturgis"
      secondaryText="Available"
      // presence={{ status: 'available' }}
      avatar={{
        image: {
          src: 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
        },
      }}
    />
  );
};
