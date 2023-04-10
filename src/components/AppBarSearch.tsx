import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RecipeAutocompleteSearch from './RecipeAutocompleteSearch';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Tooltip, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';


const AppBarSearch = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
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
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: '#000', height: '90px' }}>
        <Link to={'/'}>
          <Box
            sx={{
              height: 50,
              width: 305,
              marginRight: '32px',
              backgroundImage: `url(src/pictures/Logo.png)`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'contain',
              backgroundSize: 'cover'
            }}
          />
        </Link>
        <RecipeAutocompleteSearch />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Tooltip
            title={
              <Typography>
                <Stack spacing={1}>
                  <Link style={{ textDecoration: 'none', color: 'black' }} to="tel:555-1234-5678">
                    555-1234-5678
                  </Link>
                  <Link style={{ textDecoration: 'none', color: 'black' }} to="tel:555-1234-5678">
                    555-1234-5678
                  </Link>
                  <Link style={{ textDecoration: 'none', color: 'black' }} to="tel:555-1234-5678">
                    555-1234-5678
                  </Link>
                  <Link style={{ textDecoration: 'none', color: 'black' }} to="https://goo.gl/maps/D3vaAfVpaz6GaKJL7">
                    Kiev
                  </Link>
                </Stack>
              </Typography>
            }
          >
            <IconButton
              sx={{ m: 1, color: 'white' }}
            >
              <LocationOnIcon />
            </IconButton>
          </Tooltip>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
        {renderMenu}
      </Toolbar>
    </AppBar>
  );
}

export default AppBarSearch;
