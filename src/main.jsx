// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from './store/store'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import Products from './components/Products.jsx';
// import About from './components/About.jsx';
// import Home from './components/Home.jsx';
// import RootLayout from './components/RootLayout.jsx';
import RouteSignup from './components/RouteSignup.jsx';
import Hero from './components/Hero.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';


const router = createBrowserRouter([

    {
    path: "/",
    element: <RouteSignup/>,
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
      }

    ]
    },
  // {
  //   path: "/",
  //   element: <RootLayout />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <Products />,
  //       // loader: teamLoader,
  //     },

  //     {
  //       path: "/about",
  //       element: <About />
  //     },

  //     { 
  //       path: "/home", 
  //       element: <Home /> 
  //     }
  //   ],
  // },
 

  // { path: "/home", element: <Home /> }
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
