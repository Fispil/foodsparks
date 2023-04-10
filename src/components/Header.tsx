import React from 'react';
import { AppBar, Box } from '@mui/material';

import AppBarSearch from './AppBarSearch';
import NavigationHeaderBar from './NavigationHeaderBar';

const Header: React.FC = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'inherit' , height: '198px'}}>
      <AppBarSearch />
      <NavigationHeaderBar />
      <Box sx={{ position: 'absolute', bottom: 5, left: 0, width: '100%', backgroundColor: '#fff', height: '40px' }}>
        <img src="src/pictures/ornament.svg" style={{ width: '100%' }} alt='ornament' />
      </Box>
    </AppBar>
  );
};

export default Header;