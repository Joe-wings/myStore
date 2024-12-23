import { createBrowserRouter } from "react-router-dom";
import  Login  from "../page/login";

import Reg from "../page/reg";
import Layouter from "../page/layout";

const router=createBrowserRouter([
    {
        path:"/",
        element: <Login />
    },
    {
        path:"/register",
        element: <Reg />
    },
    {
        path:"/layout",
        element: <Layouter />,

    }
])
export default router;