import * as React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';

import { Badge, Box, Button, Typography, Theme } from '@mui/material';
import CartIcon from '../assets/basket.svg'
import { getitemCart } from '../api/fetchCart';
import { useAppSelector } from '../util/hooks';


const useStyles = makeStyles(({
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
      padding: '24px'
    },
  })
);

const CartElement: React.FC = () => {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userCart, setUserCart] = useState('');

  const isLoggined = useAppSelector(state => state.user.isLoggined);


  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const loadCartFromServer = async () => {
    try {
      const userCartFromServer = await getitemCart(isLoggined);
      setUserCart(userCartFromServer);
    } catch (error) {
      throw new Error(`Cant load cart: ${error}`);
    }
  }
  

  useEffect(() => {
    loadCartFromServer();
  }, [])


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
          <img src={CartIcon} alt='CartIcon' />
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
          keepMounted: true 
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">Кошик</Typography>
            <Button variant='text' onClick={handleDrawerClose} sx={{ textTransform: 'none' }}>
              <Typography variant="body1">Назад</Typography>
            </Button>
          </Box>
          <Box>

          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              variant='contained'
              fullWidth
              sx={{
                border: '1px solid #CB3C2E',
                textTransform: 'none',
                color: '#fff',
                fontFamily: 'Open Sans',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '16px',
                padding: '24px 0',
                borderRadius: '12px'
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