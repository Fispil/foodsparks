import React from 'react';
import { AppBar } from '@mui/material';

import AppBarSearch from './AppBarSearch';
import NavigationHeaderBar from './NavigationHeaderBar';

const Header: React.FC = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'inherit' }}>
      <NavigationHeaderBar />
      <AppBarSearch />
    </AppBar>
  );
};

export default Header;