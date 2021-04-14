import * as React from 'react';

export const navigationRef = React.createRef();

export const resetToProfile = (name, params) => {
  navigationRef.current?.reset({
    index: 0,
    routes: [
      { name: 'ProfileTab' },
    ]
  })
};