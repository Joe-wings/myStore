import { createBrowserRouter } from "react-router-dom";
import Login from "../page/login";

import Reg from "../page/reg";
import Layouter from "../page/layout";
import Manage from "../page/manage";
import Detail from "../page/productdetail";
import CreateCategory from "../page/category";
import Category from "../page/category_v2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Reg />,
  },
  {
    path: "/layout",
    element: <Layouter />,
    children: [
      {
        path: "/layout/manage",
        element: <Manage />,
      },
      {
        path: "/layout/detail",
        element: <Detail />,
      },
      {
        path: "/layout/newCategory",
        element: <CreateCategory/>,
      },
      {
        path: "/layout/editCategory",
        element: <Category/>,
      }
    ],
  },
]);
export default router;
