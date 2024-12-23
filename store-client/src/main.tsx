import { createRoot } from 'react-dom/client'

import router from './route/index.tsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(

    <RouterProvider router={router}>
   
   </RouterProvider>

 
)
