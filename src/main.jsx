// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import RouteLayout from './components/RouteLayout.jsx';
import Hero from './components/Hero.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import Cart from './components/Cart.jsx';
import Home from './components/Home.jsx';
import { foodItemsLoader } from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import CheckOut from './components/CheckOut.jsx'


const router = createBrowserRouter([

  {
    path: "/",
    element: <RouteLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Hero />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },

      {
        path: "/home",
        element: <Home />,
        loader: foodItemsLoader
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/checkout",
        element: <CheckOut />
      }


    ]
  },

]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
  // </StrictMode>,
)




