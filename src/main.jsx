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
import SignUp from './components/SignUp.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import Cart from './components/Cart.jsx';
import Home from './components/Home.jsx';
import { foodItemsLoader } from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import CheckOut from './components/CheckOut.jsx'
import Login from './components/admin/Login.jsx';
import AdminHome from './components/admin/AdminHome.jsx'

import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute.jsx';


const router = createBrowserRouter([

  {
  path: "/",
  element: <Hero />, // render directly
  errorElement: <ErrorPage />,
},

  {
    path: "/",
    element: <RouteLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "/", element: <Hero /> },
      { path: "/home", element: <Home />, loader: foodItemsLoader },
      { path: "/cart", element: <Cart /> },
      { path: "/profile", element: <Profile /> },
      { path: "/checkout", element: <CheckOut /> },

    ],

  },

  // admin 
  { path: "/admin/login", element: <Login />},
  {
    path: "/admin",
    element: <ProtectedAdminRoute />, // check isAdmin
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <RouteLayout />,  //  navbar + footer
        children: [
          { path: "home", element: <AdminHome />, loader: foodItemsLoader },
          { path: "profile", element: <Profile /> },
        ],
      }
    ]
  }

  // {
  //   path: "/admin",
  //   element: <RouteLayout />,
  //   errorElement: <ErrorPage />,
  //    children: [
  //     {
  //       path: "home",
  //       element: <AdminHome />,
  //        loader: foodItemsLoader
  //     },
  //     {
  //       path: "profile",
  //       element: <Profile />
  //     },
  //   ]
  // },

],
 {
    basename: "/food-order-app" 
  }
);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
  // </StrictMode>,
)




