import * as React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import { Badge, Box, Button, Typography, Grid, IconButton, Divider, Stack } from '@mui/material';
import CartIcon from '../assets/basket.svg'
import { deleteAllItemsCart, getitemsCart, removeItemCart } from '../api/fetchCart';
import { useAppDispatch, useAppSelector } from '../util/hooks';
import { actions as userActions } from '../features/userReduser';
import CartButton from './СartButton';
import DeleteIcon from '../assets/deleteicon.svg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(({
  root: {
    display: 'flex'
  },
  drawer: {
    minWidth: '710px',
    flexShrink: 0
  },
  drawerPaper: {
    minWidth: '720px'
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
  const isLoggined = useAppSelector(state => state.user.isLoggined);
  const userShoppingCart = useAppSelector(state => state.user.userShoppingCart);
  const dispatch = useAppDispatch();


  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const loadCartFromServer = async () => {
    if (isLoggined) {
      try {
        const userCartFromServer = await getitemsCart();

        dispatch(userActions.setShoppingCart(userCartFromServer));
      } catch (error) {
        throw new Error(`Cant load cart: ${error}`);
      }
    }
  }

  const handleClickDeleteItem = async (productId: number) => {
    try {
      const userCartFromServer = await removeItemCart(productId);
      dispatch(userActions.setShoppingCart(userCartFromServer));
    } catch (error) {
      throw new Error(`Cant load cart: ${error}`);
    }
  }

  const handleClearShoppingCart = async () => {
    try {
      const userCartFromServer = await deleteAllItemsCart();
      dispatch(userActions.setShoppingCart(userCartFromServer));
    } catch (error) {
      throw new Error(`Cant load cart: ${error}`);
    }
  }

  useEffect(() => {
    loadCartFromServer();
  }, [isDrawerOpen]);


  return (
    <Box className={classes.root}>
      <Button
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80', height: '48px', backgroundColor: '#CB3C2E' }}
        onClick={handleDrawerOpen}
      >
        <Badge badgeContent={userShoppingCart.productAmount.length} color="success">
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <Typography variant="subtitle1">Кошик</Typography>
            <Button variant='text' onClick={handleClearShoppingCart} sx={{ textTransform: 'none' }} startIcon={<img src={DeleteIcon} alt='delete icon' />}>
              <Typography variant="body2" sx={{ padding: '8px' }}>Очистити кошик</Typography>
            </Button>
            <Button variant='text' onClick={handleDrawerClose} sx={{ textTransform: 'none' }}>
              <Typography variant="body1" sx={{ padding: '8px' }}>Назад</Typography>
            </Button>
          </Box>
          <Box sx={{ marginBottom: '72px' }}>
            {userShoppingCart.productAmount.length === 0 ?
              (<Typography variant="body1" sx={{ marginBottom: '72px' }}>Ваш кошик пустий</Typography>)
              : (<Stack>
                {userShoppingCart.productAmount.map(item => (
                  <Box key={item.productId} sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid container>
                      <Grid item sm={2}>
                        <Box sx={{ marginRight: '16px' }}>
                        <img src={item.imageUrl} alt='Product picture' style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                        </Box>
                      </Grid>
                      <Grid item sm={10}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body1" sx={{ marginBottom: '24px' }}>
                            {item.name}
                          </Typography>
                          <Box sx={{ display: 'flex' }} >
                            <Box sx={{ marginRight: '32px' }}>
                              <CartButton
                                itemId={item.productId}
                                totalPrice={item.productSum}
                                elementQty={item.quantityInPackages}
                              />
                            </Box>
                            <IconButton
                              aria-label="Delete item from cart"
                              onClick={() => handleClickDeleteItem(item.productId)}
                              edge="end"
                            >
                              <img src={DeleteIcon} alt='delete icon' />
                            </IconButton>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px' }}>
                  <Typography variant='body1'>
                    Всього
                  </Typography>
                  <Typography variant='body1'>
                    {userShoppingCart.sum} грн
                  </Typography>
                </Box>
              </Stack>
              )
            }
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" style={{ width: '100%' }}>
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
            </Link>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}


export default CartElement;