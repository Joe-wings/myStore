import { createBrowserRouter } from "react-router-dom";
import  Login  from "../page/login";

import Reg from "../page/reg";
import Layouter from "../page/layout";
import EditPage from "../page/edit";
import Manage from "../page/manage";

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
        children: [{
            path:"/layout/edit",    
            element: <EditPage/>
        },
    {
        path:"/layout/manage",
        element: <Manage/>
    }]
    }
])
export default router;