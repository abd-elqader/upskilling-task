import './App.css'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'

import UserForm from './Component/UserForm.jsx'
import UserData from './Component/UserData.jsx'
import Layout from './Component/Layout.jsx';
import NotFound from './Component/NotFound.jsx';


function App() {
  const router = createBrowserRouter([
    {
      path: "/user",
      errorElement: <NotFound />,
      element: <Layout />,

      children: [
        {
          index: true,
          element: <UserForm />
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
