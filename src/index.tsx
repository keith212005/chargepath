import React, {useEffect} from 'react';
import {AppContainer} from '@navigators';
import {Provider} from 'react-redux';
import {persistor, store} from '@store';
import {PersistGate} from 'redux-persist/integration/react';
import {usePermissionListener} from '@hooks';

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
};
