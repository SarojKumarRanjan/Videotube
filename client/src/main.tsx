import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import {
  LoginForm,
  SignupForm,
} from "./pages/index.ts"

// eslint-disable-next-line react-refresh/only-export-components
const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      
      {
        path:'login',
        element:<LoginForm/>
      },
      {
        path:'signup',
        element:<SignupForm/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={Router}/>
    
    
  </StrictMode>,
)
