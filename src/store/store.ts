import {combineReducers, configureStore} from "@reduxjs/toolkit";
import favoritesReducer from '@/features/favorites/favoritesSlice'
import {type PersistConfig, persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const rootReducer = combineReducers({
    favorites: favoritesReducer
});

type RootReducerState = ReturnType<typeof rootReducer>

// cuando queremos persistir la info usamos AsyncStorage
const persistConfig: PersistConfig<RootReducerState> = {
    key: 'root', // se guarda dentro de Asyncstorage con el nombre 'persist:root'
    storage: AsyncStorage,
    whitelist: ['favorites']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    }),
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
