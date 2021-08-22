import { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const useAuth = () => {
  const [message, setMessage] = useState({
    content: '',
    show: false,
    variant: '',
  });
  function login(userObject) {
    axios
      .post('http://localhost:8000/login', {
        email: userObject.email,
        password: userObject.password,
      })
      .then((res) => {
        setMessage({
          content: res.data.message,
          show: true,
          variant: 'success',
        });
        axios.get('http://localhost:5000/user').then((res) => {
          console.log(res.data);
        });
      })
      .catch((e) => {
        setMessage({
          content: e.response.data.message,
          show: true,
          variant: 'danger',
        });
      });
  }
  function signup(userObject) {
    axios
      .post('http://localhost:8000/signup', {
        fName: userObject.name.first,
        lName: userObject.name.last,
        email: userObject.email,
        password: userObject.password,
      })
      .then((res) => {
        setMessage({
          content: res.data.message,
          show: true,
          variant: 'success',
        });

        login(userObject);
      })
      .catch((e) => {
        setMessage({
          content: e.response.data.message,
          show: true,
          variant: 'danger',
        });
      });
  }

  return {
    login,
    message,
    setMessage,
    signup,
  };
};

export default useAuth;
