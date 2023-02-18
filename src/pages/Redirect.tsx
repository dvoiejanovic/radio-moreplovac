import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {requestAccessToken} from "../services/spotify";

const Redirect = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const navigate = useNavigate();
  const redirect_uri = `${window.location.origin}${window.location.pathname}`;

  useEffect(() => {
    if (code) {
      const fetchToken = async () => {
        await requestAccessToken(code, redirect_uri);

        if (localStorage.getItem('token')) {
          navigate('/home');
        }

        navigate('/');
      }

      fetchToken();
    }
  }, []);

  return (
    <div>
      You will be redirected to home in a moment ...
    </div>
  )
}

export default Redirect;
