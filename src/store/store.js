import { configureStore,combineReducers  } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice'
import { persistStore, persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // uses localStorage

// create persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cartData'], // Only persist these slices
}



// combine reducers if needed
// const rootReducer = {
//   auth: authReducer,
//   cartData: cartReducer
// }

// Use combineReducers to create a root reducer function
const rootReducer = combineReducers({
  auth: authReducer,
  cartData: cartReducer
})


// wrap reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
})
// const store = configureStore({
//   reducer: persistedReducer,
// })



const persistor = persistStore(store)

export { store, persistor }

// export default configureStore({
//   reducer: {
//      auth:  authReducer,
//      cartData:  cartReducer,

//   }
// })