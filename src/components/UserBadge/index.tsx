import {IUserProfile} from "../../services/spotify";
import styles from './styles.module.scss';
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

interface IUserBadgeProps {
  userProfile?: IUserProfile
}

const UserBadge = (props: IUserBadgeProps) => {
  const image = props.userProfile?.images?.[0];
  const [isOpen, setIsOpen] = useState(false);
  const ref: React.Ref<HTMLDivElement> = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }
  }), [];

  const onBadgeClick = () => {
    setIsOpen((isOpen) => !isOpen);
  }


  const logout = () => {
    localStorage.removeItem('token');
    setIsOpen(false);
    navigate('/login');
  }

  const goToSettings = () => {
    setIsOpen(false);
    navigate('/settings');
  }

  return (
    <div className={styles.badge_wrapper} ref={ref}>
      <button
        type="button"
        className={styles.badge}
        onClick={onBadgeClick}
      >
        <div className={styles.avatar_container}>
          <img src={image?.url} alt="" className={styles.avatar} />
        </div>
        <div>
          {props.userProfile?.display_name}
        </div>
        {isOpen ? <AiFillCaretUp/> : <AiFillCaretDown />}
      </button>

      {isOpen &&
        <div className={styles.menu}>
          <button
            className={styles.menu_button}
            type="button"
            onClick={goToSettings}
          >
            Settings
          </button>
          <button
            className={styles.menu_button}
            type="button"
            onClick={logout}
          >
            Log out
          </button>
        </div>
      }
    </div>
  );
}

export default UserBadge;
