import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, CardHeader, Typography, Button, Avatar, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setIsSubmitting(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      if (user) {
        const setCookieOptions = {
          expires: 7,
          sameSite: 'strict'
        };

        if (window.location.protocol === 'https:') {
          setCookieOptions.secure = true;
        }

        Cookies.set('jwt', user.accessToken, setCookieOptions);
        localStorage.setItem('isAdmin', 'true');
        
        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        // Delay updating isAuthenticated and navigation
        setTimeout(() => {
          setIsAuthenticated(true);
        }, 2000); // 2 seconds delay
      }
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again later.';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      } else if (error.message.includes('Firebase:')) {
        errorMessage = error.message.split('Firebase: ')[1];
      }
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <ToastContainer />
      <Container component="main" maxWidth="xs" style={{ backgroundColor: '#2196F3', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '100vw' }}>
        <Card style={{ width: '100%', maxWidth: 400 }}>
          <CardHeader
            avatar={
              <Avatar style={{ backgroundColor: '#000' }}>
                <LockOutlinedIcon />
              </Avatar>
            }
            title={<Typography variant="h5">Admin Login</Typography>}
            style={{ textAlign: 'center', backgroundColor: '#000', color: 'white' }}
          />
          <CardContent>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ values, handleChange, handleBlur, validateForm }) => (
                <>
                  <Field
                    name="email"
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email Address"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <Field
                    name="password"
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '1rem' }}
                    disabled={isSubmitting}
                    onClick={() => {
                      validateForm(values).then(errors => {
                        if (Object.keys(errors).length === 0) {
                          handleLogin(values);
                        } else {
                          Object.values(errors).forEach(error => {
                            toast.error(error, {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                            });
                          });
                        }
                      });
                    }}
                  >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
                  </Button>
                </>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default AdminLogin;
