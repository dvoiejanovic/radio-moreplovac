
import {useEffect} from 'react';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';
import {requestAccessToken} from '~/services/authorization';
import styles from './styles.module.scss';

const Redirect = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const navigate = useNavigate();
  const redirect_uri = `${window.location.origin}${window.location.pathname}`;

  useEffect(() => {
    if (code) {
      const fetchToken = async () => {
        const accessTokenData = await requestAccessToken(code, redirect_uri);
        if (accessTokenData) {
          localStorage.setItem('token', accessTokenData.access_token);
          navigate('/');
        } else {
          navigate('/login');
        }
      }

      fetchToken();
    }
  }, []);

  return (
    <main className={styles.redirect_screen}>
      <div className={styles.message}>
        You will be redirected to Radio Moreplovac in a moment.
        <AiOutlineLoading3Quarters />
      </div>
    </main>
  )
}

export default Redirect;
