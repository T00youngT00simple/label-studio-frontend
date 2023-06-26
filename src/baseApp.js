import { LabelStudio } from './LabelStudio';
import React from 'react';
import { MultiProvider } from './providers/MultiProvider';
import { ApiProvider } from './providers/ApiProvider'


export const BaseApp = ({content}) => {  
  return (
    <MultiProvider providers={[
      <ApiProvider key="api"/>,
    ]}>
      <LabelStudio/>
    </MultiProvider>
  );
};

