import styles from './styles.module.scss';
import UserBadge from '~/components/UserBadge';
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';
import type {IUserProfile} from '~/interfaces/user-profile';
import {useEffect, useState} from 'react';

interface IHeaderProps {
  userProfile?: IUserProfile
}

const COVER_HEIGHT = 340;

const Header = (props: IHeaderProps) => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  const goBack = () => {
    navigate(-1);
  }

  const goForward = () => {
    navigate(1);
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollPosition(window.scrollY);
    }, {passive: true})
  })


  return (
    <header className={`${styles.header} ${scrollPosition >= COVER_HEIGHT && styles.header_colored}`}>
      <div className={styles.nav_button_wrapper}>
        <button
          type="button"
          className={styles.nav_button}
          onClick={goBack}
        >
          <AiOutlineLeft />
        </button>
        <button
          type="button"
          className={styles.nav_button}
          onClick={goForward}
        >
          <AiOutlineRight />
        </button>
      </div>
      <UserBadge userProfile={props.userProfile} />
    </header>
  )
}

export default Header;
