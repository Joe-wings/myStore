import { createBrowserRouter } from "react-router-dom";
import  Login  from "../page/login";

import Reg from "../page/reg";
import Layouter from "../page/layout";
import EditPage from "../page/edit";

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
        }]
            
        
    }
])
export default router;