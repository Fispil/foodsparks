import { useState } from 'react';
import { Dialog, DialogTitle, DialogContentText, Button, DialogActions, DialogContent, TextField, Grid } from '@mui/material';
import { registerNewUser } from '../api/fetchUser';
import NewUser from '../types/newuser';

const SignUpDialog = () => {
  const [open, setOpen] = useState(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
    } else if (!/^[A-Z][a-z]{1,39}$/.test(formValues.firstName)) {
      errors.firstName =
        'First name should start with a capital letter and contain only letters (2-40 characters)';
      hasError = true;
    }

    if (!formValues.lastName) {
      errors.lastName = 'Last name is required';
      hasError = true;
    } else if (!/^[A-Z][a-z]{1,39}$/.test(formValues.lastName)) {
      errors.lastName =
        'Last name should start with a capital letter and contain only letters (2-40 characters)';
      hasError = true;
    }

    if (!formValues.email) {
      errors.email = 'Email is required';
      hasError = true;
    } else if (
      !/^[\w\.\+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]{2,}$/.test(
        formValues.email
      )
    ) {
      errors.email = 'Invalid email address';
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
      registerNewUser(formValues)
      handleClose()
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
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Sign Up
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>Sign Up</DialogTitle>
        <form id="signupform" onSubmit={handleFormSubmit}>
          <DialogContent>
            <Grid container>
              <Grid item md={12}>
                <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
                  will send updates occasionally.
                </DialogContentText>
              </Grid>
              <Grid item sm={6}>
                <TextField
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
                  variant="standard"
                  required
                />
              </Grid>
              <Grid item sm={6}>
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
                  variant="standard"
                  required
                />
              </Grid>
              <Grid item sm={6}>
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
                  variant="standard"
                  required
                />
              </Grid>
              <Grid item sm={6}>
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
                  variant="standard"
                  required
                  onCopy={(event) => event.preventDefault()}
                  onCut={(event) => event.preventDefault()}
                />
              </Grid>
              <Grid item sm={6}>
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
                  variant="standard"
                  required
                  onCopy={(event) => event.preventDefault()}
                  onCut={(event) => event.preventDefault()}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
export default SignUpDialog;
