import {IUserProfile} from "../../services/spotify";
import styles from './UserBadge.module.scss';
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface IUserBadgeProps {
  userProfile: IUserProfile
}

const UserBadge = (props: IUserBadgeProps) => {
  const image = props.userProfile?.images?.[0];
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onBadgeClick = () => {
    setIsOpen((isOpen) => !isOpen);
  }

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className={styles.badge_wrapper}>
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
