import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './index.scss';
import Artist from './pages/Artist';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Redirect from './pages/Redirect';
import Search from './pages/Search';
import Settings from './pages/Settings';
import Splash from './pages/Splash';
import Track from './pages/Track';

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
        path: '/track/:id',
        element: <Track />
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
