import { useState } from 'react';
import { Dialog, DialogTitle, DialogContentText, Button, DialogActions, DialogContent, TextField, Grid } from '@mui/material';

const SignUpDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Sign Up
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>Sign Up</DialogTitle>
        <DialogContent>
          <Grid container >
            <Grid item md={12}>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We
                will send updates occasionally.
              </DialogContentText>
            </Grid>
            <Grid item sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="input"
                variant="standard"
                required
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="secondname"
                label="Second Name"
                type="input"
                variant="standard"
                required
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                variant="standard"
                required
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                type="password"
                variant="standard"
                required
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="repeatPassword"
                label="Repeat password"
                type="password"
                variant="standard"
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignUpDialog;