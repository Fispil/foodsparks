import { Box, Typography, Stack, Grid, IconButton, Divider, Button, Container, TextField, Paper } from "@mui/material"
import CartButton from "../components/СartButton";
import { useEffect } from "react";
import { getitemsCart, removeItemCart, deleteAllItemsCart } from "../api/fetchCart";
import { useAppSelector, useAppDispatch } from "../util/hooks";
import { actions as userActions } from '../features/userReduser';
import DeleteIcon from '../assets/deleteicon.svg';
import { Link } from "react-router-dom";

interface LoadingProps {

}

const OrderPage: React.FC<LoadingProps> = () => {
  const isLoggined = useAppSelector(state => state.user.isLoggined);
  const userShoppingCart = useAppSelector(state => state.user.userShoppingCart);
  const dispatch = useAppDispatch();

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
  }, [isLoggined, userShoppingCart])

  return (
    <Container maxWidth="xl">
      <Typography variant="h6">
        Особисті дані
      </Typography>
      <Box>
        <Box>
          <Typography>ПІБ</Typography>
          <TextField />
        </Box>
        <Box>
          
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <Typography variant="subtitle1">Кошик</Typography>
        <Button variant='text' onClick={handleClearShoppingCart} sx={{ textTransform: 'none' }} startIcon={<img src={DeleteIcon} alt='delete icon' />}>
          <Typography variant="body2" sx={{ padding: '8px' }}>Очистити кошик</Typography>
        </Button>
      </Box>
      <Box sx={{ marginBottom: '72px' }}>
        {userShoppingCart.productAmount.length === 0 ?
          (<Typography variant="body1" sx={{ marginBottom: '72px' }}>Ваш кошик пустий</Typography>)
          : (<Stack>
            {userShoppingCart.productAmount.map(item => (
              <Box key={item.productId} sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', borderRadius: '12px' }}>
                <Box>
                  <img src={item.imageUrl} alt='Product picture' />
                </Box>

                <Typography variant="body1">
                  {item.name}
                </Typography>
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
            ))}
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px' }}>
              <Typography variant='body1'>
                Всього
              </Typography>
              <Typography variant='body1'>
                {userShoppingCart.sum}грн
              </Typography>
            </Box>
          </Stack>
          )
        }
      </Box>
      <Stack gap={3}>
        <Stack gap={3}>
          <Typography>Коментар до замовлення</Typography>
          <TextField
            id="outlined-textarea"
            placeholder="Тут ви можете залишити побажання щодо товару "
            multiline
            rows={5}
            sx={{ borderRadius: '12px' }}
          />
        </Stack>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Ваше замовлення</Typography>
        <Paper sx={{ borderRadius: '12px' }}>
          <Stack gap={3} sx={{ padding: '32px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Промокод</Typography>
              <Link to="/"
                style={{
                  textDecoration: 'none'
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: '#000',
                    '&:hover': {
                      color: '#CB3C2E'
                    }
                  }}
                >
                  Вхід/Реєстрація
                </Typography>
              </Link>
            </Box>
            <Typography variant="body2" sx={{ color: '#ADB5BD' }}>Необхідно авторизуватись, щоб ввести промокод</Typography>
          </Stack>
        </Paper>

        <Paper sx={{ borderRadius: '12px' }}>
          <Stack gap={3} sx={{ padding: '32px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">Всього:</Typography>
              <Typography variant="body1">{userShoppingCart.sum} грн</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">Доставка:</Typography>
              <Typography variant="body1">50 грн</Typography>
            </Box>
            <Divider sx={{ border: '1px solid #ADB5BD' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Всього до сплати:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>{userShoppingCart.sum + 50} грн</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Link to="/" style={{ width: '50%' }}>
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
                >
                  <Typography variant="body1">Оплатити</Typography>
                </Button>
              </Link>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}

export default OrderPage