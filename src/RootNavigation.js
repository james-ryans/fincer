import * as React from 'react';

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export const resetToProfile = (name, params) => {
  navigationRef.current?.reset({
    index: 0,
    routes: [
      { name: 'ProfileTab' },
    ]
  })
};