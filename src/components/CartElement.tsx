import * as React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles, createStyles, } from '@mui/styles';
import Drawer from '@mui/material/Drawer';

import { Badge, Box, Button, Typography, Theme } from '@mui/material';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    drawer: {
      width: '550px',
      flexShrink: 0
    },
    drawerPaper: {
      width: '550px'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
  })
);

const CartElement: React.FC = () => {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box className={classes.root}>
      <Button
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80', height: '48px', backgroundColor: '#CB3C2E' }}
        onClick={handleDrawerOpen}
      >
        <Badge badgeContent={17} color="success">
          <img src='src/pictures/basket.svg' alt='cartIcon' />
        </Badge>
      </Button>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="right"
        open={isDrawerOpen}
        classes={{
          paper: classes.drawerPaper
        }}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">Кошик</Typography>
          <Button variant='text' onClick={handleDrawerClose}>Назад</Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              variant='contained'
              sx={{
                border: '1px solid #CB3C2E',
                textTransform: 'none', 
                color: '#fff',
                fontFamily: 'Open Sans',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '16px',
                padding: '12px 24px',
                width: '100%'
              }}
              onClick={handleDrawerOpen}
            >
              Оформити замовлення
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}


export default CartElement;