import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {requestAccessToken} from "../services/authorization";

const Redirect = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const navigate = useNavigate();
  const redirect_uri = `${window.location.origin}${window.location.pathname}`;

  useEffect(() => {
    if (code) {
      requestAccessToken(code, redirect_uri);
    }
  }, []);

  useEffect(() => {
    let redirectTimeout = setTimeout(() => {
      debugger;
      navigate('/home');
    }, 100000)

    return () => {
      clearTimeout(redirectTimeout)
    }
  });

  return (
    <div>
      You will be redirected to home in a moment ...
    </div>
  )
}

export default Redirect;
