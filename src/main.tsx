import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home';
import Redirect from './pages/Redirect';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }, {
    path: '/home',
    element: <Home />
  }, {
    path: '/redirect',
    element: <Redirect />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <RouterProvider router={router} />
  </>,
)
