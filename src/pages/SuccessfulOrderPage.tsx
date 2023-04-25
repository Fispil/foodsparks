import { Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/BreadCrums';
import { useEffect } from 'react';
import { useAppDispatch } from '../util/hooks';
import { actions as userActions } from '../features/userReduser';
import { getitemsCart } from '../api/fetchCart';

const SuccessfulOrderPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const loadUserCart = async () => {
    const userCartFromServer = await getitemsCart();

    dispatch(userActions.setShoppingCart(userCartFromServer));
  }

  useEffect(() => {
    loadUserCart();
  }, [])
  return (
    <Container>
      <Breadcrumb />
      <Stack gap={4} sx={{ marginBottom: '40px' }}>
        <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>Ваше замовлення успішно оформлено!</Typography>
        <Typography variant='body2' sx={{ color: '#868E96' }}>Квитанція відправлена на вашу пошту.</Typography>
        <Typography variant='body1'>Дякуємо вам за вашу покупку! Гарого дня. Можливо вас зацікавить інші рецепти?</Typography>
      </Stack>
      <Button
        variant="contained"
        sx={{
          borderRadius: '12px',
          backgroundColor: 'rgb(176,224,230)',
          color: 'black',
          padding: '16px 24px',
          fontWeight: 400,
          width: '240px',
          height: '64px',
          background: '#CB3C2E',
        }}>
        <Link
          to="/products"
          style={{
            textDecoration: 'none',
            fontFamily: 'Open Sans',
            fontSize: '20px',
            lineHeight: '16px',
            color: '#fff',
            fontStyle: 'normal',
            textTransform: 'none'
          }}>
          <Typography variant='body1'>Всі рецепти</Typography>
        </Link>
      </Button>
    </Container>
  );
}

export default SuccessfulOrderPage;