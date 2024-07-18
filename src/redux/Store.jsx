import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./RootReducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";


const persistConfig = {
    key: 'root',
    whitelist: ['SignIn'],
    storage,
};

const persistanceReducer = persistReducer(persistConfig, RootReducer);

const store = configureStore({
    reducer: persistanceReducer
});

export const persistor = persistStore(store);
export default store;
