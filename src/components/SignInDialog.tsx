import { useState } from 'react';
import { Dialog, DialogTitle, DialogContentText, Button, DialogActions, DialogContent, TextField, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import User from '../types/user';
import { loginUser } from '../api/fetchUser';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import OutlinedInput from '@mui/material/OutlinedInput';

const SignInDialog = () => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userAuth, setUserAuth] = useState<User>({
    login: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    login: '',
    password: '',
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserAuth((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = {
      login: '',
      password: '',
    };
    let hasError = false;

    if (!userAuth.login) {
      errors.login = 'First name is required';
      hasError = true;
    }

    if (!userAuth.password) {
      errors.password = 'Password is required';
      hasError = true;
    }

    setFormErrors(errors);
    if (hasError) {
      return;
    }

    if (!hasError) {
      loginUser(userAuth)
      handleClose()
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Вхід
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{ padding: '30px 24px', borderRadius: '12px' }}>
        <Box sx={{ padding: '30px 24px', borderRadius: '12px' }}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px 9', marginBottom: '8px' }}>
            <Typography variant="subtitle1">
              Вхід
            </Typography>
            <Link to="/">
              <Typography variant="body2">
                Забули пароль?
              </Typography>
            </Link>
          </DialogTitle>
          <form onSubmit={handleFormSubmit}>
            <DialogContent sx={{ minWidth: '540px', marginBottom: '32px' }}>
              <DialogContentText sx={{ marginBottom: '32px' }}>
                <Typography variant="body2">
                  Для входу в особистий кабінет,<br />
                  вкажіть пошту та пароль
                </Typography>
              </DialogContentText>
              <Typography variant="body2">
                Пошта
              </Typography>
              <TextField
                variant="outlined"
                error={formErrors.login.length > 0}
                helperText={userAuth.login ? `${formErrors.login}` : ''}
                value={userAuth?.login}
                onChange={handleInputChange}
                autoFocus
                margin="dense"
                name="login"
                id="emailSignIn"
                placeholder="Email Address"
                type="email"
                fullWidth
                required
                sx={{
                  border: '1px solid #CED4DA',
                  borderRadius: '12px',
                }}
              />
              <Typography variant="body2">
                Пароль
              </Typography>
              <OutlinedInput
                value={userAuth?.password}
                onChange={handleInputChange}
                autoFocus
                margin="dense"
                name="password"
                id="passwordSignIn"
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                sx={{
                  border: '1px solid #CED4DA',
                  borderRadius: '12px',
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </DialogContent>
            <DialogActions sx={{ padding: '0 24px', display: 'flex', flexDirection: 'column' }}>
              <Button type="submit" variant='contained' sx={{ width: '100%', marginBottom: '40px' }}>Увійти</Button>
              <Typography variant='body2' sx={{ marginBottom: '24px' }}>Вхід за допомогою соціальних мереж</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
                <IconButton
                  sx={{
                    border: '1px solid #CED4DA',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '12px',
                    padding: 0,
                    boxSizing: 'border-box'
                  }}
                >
                  <Link to="/" style={{ margin: 0, padding: 0, height: '64px', width: '65px' }}>
                    <img src='src/pictures/google.svg' alt="googleicon" style={{ padding: '18px' }} />
                  </Link>
                </IconButton>
                <IconButton
                  sx={{
                    border: '1px solid #CED4DA',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '12px',
                    padding: 0,
                    boxSizing: 'border-box'
                  }}
                >
                  <Link to="/" style={{ margin: 0, padding: 0, height: '64px', width: '65px' }}>
                    <img src='src/pictures/apple.svg' alt="appleicon" style={{ padding: '18px' }} />
                  </Link>
                </IconButton>
                <IconButton
                  sx={{
                    border: '1px solid #CED4DA',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '12px',
                    padding: 0,
                    boxSizing: 'border-box'
                  }}
                >
                  <Link to="/" style={{ margin: 0, padding: 0, height: '64px', width: '65px' }}>
                    <img src='src/pictures/facebook.svg' alt="facebookicon" style={{ padding: '18px' }} />
                  </Link>
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='body2'>
                  Не маєте аккаунта?
                </Typography>
                <Button sx={{ textTransform: 'none' }} onClick={handleClose}>
                  <Link to="/register">
                    <Typography variant='body2' sx={{ color: '#CB3C2E' }}>Зареєструватись</Typography>
                  </Link>
                </Button>
              </Box>
            </DialogActions>
          </form>
        </Box>
      </Dialog>
    </div>
  );
};

export default SignInDialog;