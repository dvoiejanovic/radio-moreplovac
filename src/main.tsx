import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home';
import Redirect from './pages/Redirect';
import Search from './pages/Search/Search';
import Layout from './pages/Layout/Layout';
import Settings from './pages/Settings';
import Splash from './pages/Splash';
import Artist from './pages/Artist';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Splash />
  }, {
    element: <Layout />,
    children: [
      {
        path: '/search',
        element: <Search/>
      }, {
        path: '/settings',
        element: <Settings />
      }, {
        path: '/artist/:id',
        element: <Artist />
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
