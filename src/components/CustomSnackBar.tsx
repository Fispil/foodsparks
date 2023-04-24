import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../util/hooks';
import { actions as snackActions } from '../features/snackReducer';
import { Typography } from '@mui/material';

interface Props { }

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props: AlertProps,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackBar: React.FC<Props> = () => {
  const isActive = useAppSelector(state => state.snack.isActive);
  const severity = useAppSelector(state => state.snack.severity);
  const message = useAppSelector(state => state.snack.message);
  const dispatch = useAppDispatch();

  const handleClose = (event: React.SyntheticEvent<Element, Event>, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(snackActions.setIsActive(!isActive));
    dispatch(snackActions.setMessage(''));
    dispatch(snackActions.setSeverity('success'));
  };

  const handleSnackBarClose = (event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(snackActions.setIsActive(!isActive));
    dispatch(snackActions.setMessage(''));
    dispatch(snackActions.setSeverity('success'));
  };

  return (
    <Snackbar open={isActive} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={handleSnackBarClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        <Typography variant='body2'>
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;