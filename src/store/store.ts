import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  networkReducer,
  themeReducer,
  userReducer,
  currentRegionReducer,
  mapTypeReducer,
  getChargingStationsReducer,
  locationPermissionReducer,
} from '@slice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['isOnline', 'region', 'locationPermission', 'stationList'],
};

const rootReducer = combineReducers({
  network: networkReducer,
  user: userReducer,
  theme: themeReducer,
  locationPermission: locationPermissionReducer,
  region: currentRegionReducer,
  mapType: mapTypeReducer,
  stationList: getChargingStationsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
