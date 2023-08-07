import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { AuthContext } from './AuthContext';

const Auth = () => {
    const { setAuthInfo } = React.useContext(AuthContext);
    const navigate = useNavigate();
    function notif() {
        notification.info({ message: 'Authentification échouée', description: 'Vous devez vous connecter à Lifeboard'});
      }
    useEffect(() => {
        
      axios.post("http://localhost:5001/auth", {}, { withCredentials: true })
        .then(response => {
          console.log(response);
          const isAuth = response.data.status;
          let infos = response.data
          setAuthInfo(infos);
          isAuth ? console.log("success") : (() => {
            navigate('/Login');
            notif();
          })();
        })
        .catch(error => {
          navigate('/error');
          console.log(error);
        });
    }, []); // 
}

export default Auth;