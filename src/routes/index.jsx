import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import { Suspense } from "react";

import Home from '../views/Home';
import Detail from '../views/Detail';
import Error404 from "../views/Error404";

import Profile from "../views/Profile";
import MyInfo from "../views/Profile/components/MyInfo";
import LikedEvents from "../views/Profile/components/LikedEvents";
import SignupForm from "../views/SignupForm";

  const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        errorElement: <Error404/>
    },
    {
        path:'/detail/:eventId',
        element: 
          (<Suspense fallback={<div>Cargando...</div>}>
            <Detail/>
          </Suspense>)
        
    },
    {
        path:'/profile',
        element: <Profile/>,
        children: [{
          path: 'my-info',
          element: <MyInfo/>
        },{
          path: 'liked-events',
          element: <LikedEvents/>
        }]
    },
    {
      path:'/sign-up',
      element: <SignupForm/>
    }
  ])
const MyRoutes=()=><RouterProvider router={router} />;
    


export default MyRoutes;