import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import campersReducer from './campers/slice.js';
import filtersReducer from './filters/slice.js';

const campersPersistConfig = {
  key: '',
  storage,
  whiteList: [''],
};

const pCampersReducer = persistReducer(campersPersistConfig, campersReducer);

export const store = configureStore({
  reducer: {
    campers: pCampersReducer,
    filters: filtersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
