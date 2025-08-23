// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from './store/store'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import RouteSignup from './components/RouteSignup.jsx';
import Hero from './components/Hero.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import Cart from './components/Cart.jsx';
import Home from './components/Home.jsx';
import {foodItemsLoader} from './components/Home.jsx'


const router = createBrowserRouter([

    {
    path: "/",
    element: <RouteSignup/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:"/",
        element:<Hero/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<SignUp/>
      },

       {
        path:"/home",
        element:<Home/>,
        loader:foodItemsLoader
      },
       {
        path:"/cart",
        element:<Cart/>
      }

    ]
    },

]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    {/* <RouterProvider router={router} /> */}
    <RouterProvider router={router} />
    {/* <App /> */}
  </Provider>
  // </StrictMode>,
)




