import {ReactNode, useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Layout.module.scss";


interface ILayoutProps {
  children?: ReactNode
}

const Layout = (props?: ILayoutProps) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  return (
    <div className={styles.layout}>
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;
