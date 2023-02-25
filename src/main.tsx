import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home';
import Redirect from './pages/Redirect';
import Search from './pages/Search/Search';
import Layout from './pages/Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <App />
  }, {
    element: <Layout />,
    children: [
      {
        path: '/search',
        element: <Search/>
      }, {
        path: '/',
        element: <Home />
      }
    ]
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
