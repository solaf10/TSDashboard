import { createBrowserRouter } from "react-router";
import Auth from "../pages/Auth";
import LogIn from "../pages/Login/LogIn";
import Register from "../pages/Register/Register";
import Root from "../pages/Root";
import Items from "../pages/Items/Items";
import AddItem from "../pages/AddItem";
import EditItem from "../pages/EditItem";
import ItemsList from "../pages/Items/ItemsList/ItemsList";
import Favorites from "../pages/Favorites";
import Orders from "../pages/Orders";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "",
        element: <LogIn />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "items",
        element: <Items />,
        children: [
          {
            path: "",
            element: <ItemsList />,
          },
          {
            path: "add",
            element: <AddItem />,
          },
          {
            path: "edit/:id",
            element: <EditItem />,
          },
        ],
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
]);
