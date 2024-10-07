/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Login from './pages/Auth/login.jsx'
import Home from './pages/User/Home/Home.jsx'
import Signup from './pages/Auth/Signup.jsx'
import Dashboard from './pages/Admin/Dashboard/Dashboard.jsx'
import UserLayout from './Layouts/UserLayout.jsx'
import AdminLayout from './Layouts/AdminLayout.jsx'
import ProtectedRoute  from '../src/helper/ProtectedRoute.js'
import NotAuthorized from './components/NotAuthorized.jsx'

const BrowserRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup />, 
  },
  {
    path:"/",
    element:<App/>
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout /> 
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />, 
      },
      {
        path: "reports",
        element: <p />, 
      },
      {
        path: "settings",
        element: <p/>, 
      },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute requiredRole="user">
        <UserLayout /> 
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home/>, 
      },
      {
        path: "profile",
        element: <p />,
      },
      {
        path: "settings",
        element: <p />, 
      },
    ],
  },
  {
    path: "/not-authorized",
    element: <NotAuthorized />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={BrowserRouter} />
  </StrictMode>
);