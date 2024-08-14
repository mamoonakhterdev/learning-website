import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth, database } from '../../firebaseConfig';
import { ref, get } from 'firebase/database';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { ClientContext } from './ClientContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUserData } = useContext(ClientContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      Cookies.set('jwt', token, { expires: 1, secure: true, sameSite: 'None' });
      if (user.emailVerified) {
        const userInfoRef = ref(database, 'userInfo');
        const snapshot = await get(userInfoRef);

        if (snapshot.exists()) {
          const userInfo = snapshot.val();
          let userData = null;

          for (const key in userInfo) {
            if (userInfo[key].uid === user.uid) {
              userData = userInfo[key];
              break;
            }
          }


          if (userData) {
            setUserData(userData);
            toast.success('Login successful');
            setTimeout(() => {
              navigate('/');
            }, 3000);
          } else {
            toast.error('User data does not exist!');
          }
        } else {
          toast.error('User data does not exist!');
        }
      } else {
        toast.error('Please verify your email before logging in.');
      }
    } catch (error) {
      toast.error('Incorrect Email or Password!');
    }
  };

  return (
    <div className="login-container d-flex">
      <ToastContainer />
      <div className="login-text d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-4">Welcome to My Site</h1>
        <p className="lead">
          Discover our amazing features and get started with our platform.
          <br />
          Join us to explore more and make the most out of our services.
        </p>
      </div>
      <div className="login-form d-flex flex-column justify-content-center align-items-center">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
