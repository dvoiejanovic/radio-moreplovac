import {ReactNode, useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import {getUserProfile, IUserProfile} from "../../services/spotify";
import styles from "./Layout.module.scss";


interface ILayoutProps {
  children?: ReactNode
}

const Layout = (props?: ILayoutProps) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<IUserProfile>();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const fetchUserProfile = async() => {
      const profile = await getUserProfile();
      setUserProfile(profile);
    }
    fetchUserProfile();
  }, [])


  return (
    <div className={styles.layout}>
      <Header userProfile={userProfile} />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;
