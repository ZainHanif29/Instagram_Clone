import React from "react";
import { Button } from "./components/ui/button";
import Signup from "./components/Signup";
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import LeftSideBar from "./components/LeftSideBar";

const BrowserRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home />,
    children:[
      {
        path:'/',
        element:<LeftSideBar />
      },
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/profile',
        element:<Profile />
      },
    ]
  },
  {
    path:'/signup',
    element:<Signup />
  },
  {
    path:'/login',
    element:<Login />
  },
]);

const App = () => {
  return (
    <>
    <RouterProvider router={BrowserRouter} />
    </>
  );
};

export default App;
