import {ReactNode, useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import Header from "~/components/Header";
import Sidebar from "~/components/Sidebar";
import {getUserProfile, IUserProfile} from "~/services/spotify";
import styles from "./styles.module.scss";


const Layout = () => {
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
      <main className={styles.layout_body}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;
