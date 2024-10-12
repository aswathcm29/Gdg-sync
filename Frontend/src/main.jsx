/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './pages/Auth/Login.jsx'
import Signup from './pages/Auth/Signup.jsx'
import App from './App.jsx'
import './index.css'
import AdminLayout from './Layouts/AdminLayout.jsx';
import UserLayout from './Layouts/UserLayout.jsx'
import Dashboard from './pages/Admin/Dashboard/Dashboard.jsx'
import Home from './pages/User/Home/Home.jsx'
import ProtectedRoute  from '../src/helper/ProtectedRoute.js'
import NotAuthorized from './components/NotAuthorized.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux';
import CreateEvent from './pages/Admin/Dashboard/CreateEvent.jsx'
import Calendar from './pages/Admin/Calendar/Calendar.jsx'
import Event from './pages/Admin/Events/Event.jsx'
import EventView from './pages/Admin/EventView/EventView.jsx'
import UpdateEvent from './pages/Admin/UpdateEvent/UpdateEvent.jsx'
import EventUserView from './pages/User/EventView/EventUserView.jsx'



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
        path: "create",
        element: <CreateEvent />, 
      },
      {
        path: "events",
        element: <Event/>, 
      },
      {
        path:"calendar",
        element:<Calendar/>
      },
      {
          path: "event/:id",
          element: <EventView />,
      },
      {
        path:'update/event/:id',
        element : <UpdateEvent/>
      }
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
        path: "event/:id",
        element: <EventUserView/>,
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
    <Provider store={store}>
    <RouterProvider router={BrowserRouter} />
    </Provider>
  </StrictMode>
);