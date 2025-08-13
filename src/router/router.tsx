import { createBrowserRouter } from "react-router";
import Auth from "../pages/Auth";
import LogIn from "../pages/Login/LogIn";
import Register from "../pages/Register/Register";
import Root from "../pages/Root";
import Items from "../pages/Items/Items";
import AddItem from "../pages/AddItem";
// import EditItem from "../pages/EditItem";
import ItemsList from "../pages/Items/ItemsList/ItemsList";
import Favorites from "../pages/Favorites";
import Orders from "../pages/Orders";
import Home from "../pages/Home/Home";
import { lazy, Suspense } from "react";
import Loader from "../components/Loader/Loader";

const EditItem = lazy(() => import("../pages/EditItem"));

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
            element: (
              <Suspense fallback={<Loader />}>
                <EditItem />
              </Suspense>
            ),
            loader: async ({ params }) => {
              const { id } = params;
              const res = await fetch(`https://vica.website/api/items/${id}`, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              });
              if (!res.ok) {
                throw new Error("couldn't fetch data");
              }
              return res.json();
            },
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
