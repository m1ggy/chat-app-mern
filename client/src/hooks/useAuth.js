import { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const useAuth = () => {
  const [message, setMessage] = useState(null);
  async function login(userObject) {
    axios
      .post('http://localhost:8000/login', {
        email: userObject.email,
        password: userObject.password,
      })
      .catch((e) => console.log(e))
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.message);
          setMessage(res.data.message);
          const cookie = `; ${document.cookie}`;
          const parts = cookie.split(`; accessCookie=`);
          console.log(parts);
        }
      });
  }

  return {
    login,
    message,
  };
};

export default useAuth;
