import { Box, Typography, Container, Theme, Stack } from '@mui/material';

import { Link } from 'react-router-dom';
import { theme } from '../theme';

const Footer = () => {

  return (
    <Container
      maxWidth="xl"
      component="footer"
      style={{
        position: 'sticky',
        height: '135px',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
        borderTop: '1px solid rgba(0, 0, 0, 0.4)',
        boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.05)',
        padding: '32px 88px'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alighnItems: 'center', marginBottom: '48px' }}>
        <Box>
          <Link to="/" style={{ marginBottom: '8px' }}>
            <Box
              sx={{
                height: 50,
                width: 305,
                backgroundImage: `url(src/pictures/logowhite.svg)`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'contain',
                backgroundSize: 'cover',
                marginBottom: '8px',
              }}
            />
          </Link>
          <Typography variant="body2">Новий сервіс доставки продуктів з<br /> покроковими рецептами для <br />приготування смачних українських<br />страв вдома.</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ marginBottom: '24px', color: theme.palette.primary.main }}>
            Місто
          </Typography>
          <Stack spacing={2}>
            <Typography variant="body2">Київ</Typography>
            <Typography variant="body2">Львів</Typography>
            <Typography variant="body2">Одеса</Typography>
          </Stack>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ marginBottom: '24px', color: theme.palette.primary.main }}>
            Сторінки
          </Typography>
          <Stack spacing={2}>
            <Typography variant="body2">Усі рецепти</Typography>
            <Typography variant="body2">Кошик</Typography>
            <Typography variant="body2">Доставка</Typography>
            <Typography variant="body2">Політика конфедиційності</Typography>
          </Stack>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ marginBottom: '24px', color: theme.palette.primary.main }}>
            Звязатися з нами
          </Typography>
          <Stack spacing={2}>
            <Typography variant="body2">+380 (095) 504 - 00 - 01</Typography>
            <Typography variant="body2">foodsparks@gmail.com</Typography>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ marginBottom: '24px' }}>
        <img src="src/pictures/ornament.svg" style={{ width: '100%' }} alt='ornament' />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alighnItems: 'center', paddingBottom: '32px'}}>
        <Typography sx={{ textAlign: 'center', color: '#212529' }} variant='body2'>© 2023 Foodsparks. All Rights Reserved. </Typography>
      </Box>
    </Container >
  )
}

export default Footer;