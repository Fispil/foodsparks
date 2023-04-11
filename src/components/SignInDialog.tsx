import { useState } from 'react';
import { Dialog, DialogTitle, DialogContentText, Button, DialogActions, DialogContent, TextField } from '@mui/material';
import User from '../types/user';
import { loginUser } from '../api/fetchUser';

const SignInDialog = () => {
  const [open, setOpen] = useState(false);
  const [userAuth, setUserAuth] = useState<User>({
    login: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    login: '',
    password: '',
  });

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
        Sign In
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>Sign In</DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
            <TextField
              error={formErrors.login.length > 0}
              helperText={userAuth.login ? `${formErrors.login}` : ''}
              value={userAuth?.login}
              onChange={handleInputChange}
              autoFocus
              margin="dense"
              name="login"
              id="emailSignIn"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              required
            />
            <TextField  
              error={formErrors.password.length > 0}
              helperText={userAuth.password ? `${formErrors.password}` : ''}
              value={userAuth?.password}
              onChange={handleInputChange}
              autoFocus
              margin="dense"
              name="password"
              id="passwordSignIn"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default SignInDialog;