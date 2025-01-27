import './App.css'
import { createBrowserRouter, Navigate, RouterProvider, } from 'react-router-dom'

import UserForm from './Component/UserForm.jsx'
import UserData from './Component/UserData.jsx'
import Layout from './Component/Layout.jsx';
import NotFound from './Component/NotFound.jsx';
import UserUpdateForm from './Component/UserUpdateForm.jsx';


function App() {
  const router = createBrowserRouter([

    {
      path: "/",
      element: <Navigate to="/user" replace />, // Redirect root path to /user
    }, {
      path: "/user",
      errorElement: <NotFound />,
      element: <Layout />,

      children: [
        {
          index: true,
          element: <UserForm />
        },
        {
          path: 'update',
          element: <UserUpdateForm />
        },
        {
          path: "form",
          element: <UserForm />
        }, {
          path: "data",
          element: <UserData />
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
