import React from "react";
import Signup from "./components/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import ChatPage from "./components/ChatPage";

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile/:id',
        element: <Profile />
      },
      {
        path: '/account/edit',
        element: <EditProfile />
      },
      {
        path: '/chatpage',
        element: <ChatPage />
      },
    ]
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
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
