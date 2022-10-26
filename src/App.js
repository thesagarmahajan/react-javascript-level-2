import logo from './logo.svg';
import './App.css';
import AllUsersFunctional from './functional_users/AllUsers';
import AllUsersClass from './class_users/AllUsers';
import AddUserFunctional from './functional_users/AddUser';
import AddUserClass from './class_users/AddUser';

import { Outlet } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Entry from './Entry';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Entry />,
    children:[
      {
        path: "/add_users_functional",
        element: <AddUserFunctional />,
      },
      {
        path: "/all_users_functional",
        element: <AllUsersFunctional />,
      },
      {
        path: "/add_users_class",
        element: <AddUserClass />,
      },
      {
        path: "/all_users_class",
        element: <AllUsersClass />,
      }
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
