import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Tooltip, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import CartElement from './CartDrawer';
import LocationIcon from '../assets/icons_location.svg';
import LogoSvg from '../assets/Logo.png'
import ProfileMenu from './ProfileMenu';
import CustomSearchBar from './CustomSearchBar';
import { useAppSelector } from '../util/hooks';


const AppBarSearch = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isLoggined = useAppSelector(state => state.user.isLoggined);
  const userAddressInformation = useAppSelector(state => state.user.userAddress);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000' }}>
      <Toolbar>
        <Container maxWidth="xl" sx={{ height: '90px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 64px' }}>
          <Box sx={{ display: 'flex' }}>
            <Link to={'/'}>
              <Box
                sx={{
                  height: 50,
                  width: 305,
                  marginRight: '32px',
                  backgroundImage: `url(${LogoSvg})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'contain',
                  backgroundSize: 'cover'
                }}
              />
            </Link>
            <CustomSearchBar />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '24px' }}>
              <ProfileMenu />
              <Tooltip
                title={
                  <Typography variant='body1' sx={{ padding: '20px' }}>
                   {isLoggined ? `${userAddressInformation.town}` : 'Адреса не вказана'}
                  </Typography>
                }
              >
                <Button
                  sx={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80', height: '48px' }}
                >
                  <img src={LocationIcon} alt='locationicon' />
                </Button>
              </Tooltip>
              <CartElement />
            </Box>
            {renderMenu}
          </Box>
        </Container>
      </Toolbar>
    </AppBar >
  );
}

export default AppBarSearch;
