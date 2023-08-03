import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { MMKV } from 'react-native-mmkv';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  Storage,
} from 'redux-persist';

import entities from './entitiesExample';
import slice from './sliceExample';

const storage = new MMKV();

const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  blacklist: ['slice'],
};

const rootReducer = combineReducers({
  entities,
  slice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type RootDispatch = typeof store.dispatch;

// To be used instead of default 'useDispatch' and 'useSelector'.
export const useAppDispatch = () => useDispatch<RootDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const middlewareConfig = {
  immutableCheck: { warnAfter: 200 },
  serializableCheck: {
    warnAfter: 200,
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(middlewareConfig),
});

export const persistor = persistStore(store);
