import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { registerNewUser } from '../api/fetchUser';
import { NewUser } from '../types/user';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../util/hooks';
import { actions as snackActions } from '../features/snackReducer';

const SignUpPage = () => {
  const [formValues, setFormValues] = useState<NewUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      password:
        '',
      confirmPassword: ''
    };
    let hasError = false;

    if (!formValues.firstName) {
      errors.firstName = 'First name is required';
      hasError = true;
    } else if (!/^([A-Za-z\u0400-\u04FF])([A-Za-z\u0400-\u04FF '-]{0,38})$/.test(formValues.firstName)) {
      errors.firstName =
        'First name should start with a capital letter and contain only letters (2-40 characters)';
      hasError = true;
    }

    if (!formValues.lastName) {
      errors.lastName = 'Last name is required';
      hasError = true;
    } else if (!/^([A-Za-z\u0400-\u04FF])([A-Za-z\u0400-\u04FF '-]{0,38})$/.test(formValues.lastName)) {
      errors.lastName =
        'Last name should start with a capital letter and contain only letters (2-40 characters)';
      hasError = true;
    }
    
    if (!formValues.email) {
      errors.email = 'Email is required';
      hasError = true;
    } else if (
      !/^[\w.\+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]{2,}$/.test(formValues.email)
    ) {
      errors.email = 'Invalid email address';
      hasError = true;
    } else if (
      !/^[\w.\+\-]{1,64}@(?:(?!-)[A-Za-z0-9\-]{1,63}\.?)+[A-Za-z]{2,63}$/.test(formValues.email)
    ) {
      errors.email = 'Invalid email format';
      hasError = true;
    } else if (
      formValues.email.length < 5 || formValues.email.length > 72
    ) {
      errors.email = 'Email length should be between 5 and 72 characters';
      hasError = true;
    }

    if (!formValues.password) {
      errors.password = 'Password is required';
      hasError = true;
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,30}$/.test(
        formValues.password
      )
    ) {
      errors.password =
        'Password should contain at least 1 capital letter, 1 digit, 1 special character, and be 8-30 characters long';
      hasError = true;
    }

    if (!formValues.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
      hasError = true;
    } else if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }

    setFormErrors(errors);
    if (hasError) {
      return;
    }

    if (!hasError) {
      try {
        const isUserRegistred = await registerNewUser(formValues);

        if (typeof isUserRegistred === 'object' && isUserRegistred.isAxiosError && isUserRegistred.response?.data.message) {
          dispatch(snackActions.setMessage(isUserRegistred.response.data.message));
          dispatch(snackActions.setSeverity('error'));
          dispatch(snackActions.setIsActive(true));
          return;
        }

        dispatch(snackActions.setMessage('Ви успішно зареєстровали користувача, пітвердіть ваш Email'));
        dispatch(snackActions.setIsActive(true));

        setTimeout(() => {
          navigate('/');
        }, 1000);
      } catch (error) {
        throw new Error(`Failed to login:${error}`);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isEmptyLine = (text: string) => {
    return text.length > 1 ? true : false;
  }

  return (
    <Container component="main" maxWidth='md' sx={{ minHeight: 'calc(100vh - 135px - 64px)' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Реєстрація
        </Typography>
        <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
          <Grid container>
            <Grid item md={12}>
              <Typography variant='body2'>
                Для регістрації нового користувача, заповніть будь-ласка поля.
              </Typography>
            </Grid>
            <Grid item sm={5}>
              <TextField
                variant="outlined"
                error={isEmptyLine(formErrors.firstName)}
                helperText={formErrors.firstName.length ? `${formErrors.firstName}` : ''}
                autoFocus
                value={formValues.firstName}
                onChange={handleInputChange}
                margin="dense"
                id="firstName"
                name='firstName'
                label="Name"
                type="input"
                required
                fullWidth
              />
            </Grid>
            <Grid item sm={2} />
            <Grid item sm={5}>
              <TextField
                error={formErrors.lastName.length > 0}
                helperText={formErrors.lastName ? `${formErrors.lastName}` : ''}
                value={formValues.lastName}
                onChange={handleInputChange}
                autoFocus
                margin="dense"
                id="lastName"
                name='lastName'
                label="Last Name"
                type="input"
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid item sm={5}>
              <TextField
                error={formErrors.email.length > 0}
                helperText={formErrors.email ? `${formErrors.email}` : ''}
                value={formValues.email}
                onChange={handleInputChange}
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                name='email'
                type="email"
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid item sm={2} />
            <Grid item sm={5}>
              <TextField
                error={formErrors.password.length > 0}
                helperText={formErrors.password ? `${formErrors.password}` : ''}
                value={formValues.password}
                onChange={handleInputChange}
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                name='password'
                type="password"
                variant="outlined"
                required
                onCopy={(event) => event.preventDefault()}
                onCut={(event) => event.preventDefault()}
                fullWidth
              />
            </Grid>
            <Grid item sm={5}>
              <TextField
                error={formErrors.confirmPassword.length > 0}
                helperText={formErrors.confirmPassword ? `${formErrors.confirmPassword}` : ''}
                value={formValues.confirmPassword}
                onChange={handleInputChange}
                autoFocus
                margin="dense"
                id="confirmPassword"
                label="Confirm password"
                name='confirmPassword'
                type="password"
                variant="outlined"
                required
                onCopy={(event) => event.preventDefault()}
                onCut={(event) => event.preventDefault()}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, textTransform: 'none', padding: '16px 24px' }}>
            <Typography variant='body1'>Sign Up</Typography>
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography variant='body2' sx={{ color: '#CB3C2E', textDecoration: 'none' }}>Already have an account? Sign in</Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};


export default SignUpPage