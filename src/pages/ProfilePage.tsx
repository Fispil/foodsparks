import { Box, Typography, Container } from '@mui/material';
import React, { useEffect } from 'react'
import { adressByUser, informationByUser } from '../api/fetchUser';
import { useAppDispatch, useAppSelector } from '../util/hooks';
import { actions as userActions } from '../features/userReduser';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const userInformation = useAppSelector((state) => state.user.userInformation);
  const userAddress = useAppSelector((state) => state.user.userAddress);

  const loadUserFromServer = async () => {
    try {
      const [userFromServer, userAddressFromServer] = await Promise.all([
        await informationByUser(),
        await adressByUser(),
      ]);
      
      dispatch(userActions.setUserInformation(userFromServer));
      dispatch(userActions.setUserAddress(userAddressFromServer));

      console.log(userInformation);
      console.log(userAddress);

    } catch (error) {
      throw new Error(`Cant handle load: ${error}`)
    }
  }

  useEffect(() => {
    loadUserFromServer();
  }, [])

  return (
    <Container>
      <Typography variant='subtitle1'>{userInformation.firstName}</Typography>
      <Typography variant='subtitle1'>{userAddress.id}</Typography>
    </Container>
  );
}

export default ProfilePage;