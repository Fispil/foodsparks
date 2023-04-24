import { Box, Typography, Container, Stack } from '@mui/material';

import { Link } from 'react-router-dom';
import { theme } from '../theme';
import OrnamentSvg from '../assets/ornament.svg';
import WhiteLogo from '../assets/logowhite.svg';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#fff', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.05)', }}>
      <Container
        maxWidth="xl"
        component="footer"
        style={{
          position: 'sticky',
          boxSizing: 'border-box',
          borderTop: '1px solid rgba(0, 0, 0, 0.4)',
          
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
                  backgroundImage: `url(${WhiteLogo})`,
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
              <Link to='/products' style={{ textDecoration: 'none', color: '#000' }}>
                <Typography
                  variant="body2"
                  sx={{
                    ':hover': {
                      color: '#CB3C2E',
                    },
                  }}
                >
                  Усі рецепти
                </Typography>
              </Link>
              <Link to='/order' style={{ textDecoration: 'none', color: '#000' }}>
                <Typography
                  variant="body2"
                  sx={{
                    ':hover': {
                      color: '#CB3C2E',
                    },
                  }}
                >
                  Кошик
                </Typography>
              </Link>
              <Link to='/delivery' style={{ textDecoration: 'none', color: '#000' }}>
                <Typography
                  variant="body2"
                  sx={{
                    ':hover': {
                      color: '#CB3C2E',
                    },
                  }}
                >
                  Доставка
                </Typography>
              </Link>
              <Link to='/delivery' style={{ textDecoration: 'none', color: '#000' }}>
                <Typography
                  variant="body2"
                  sx={{
                    ':hover': {
                      color: '#CB3C2E',
                    },
                  }}
                >
                  Політика конфедиційності
                </Typography>
              </Link>
            </Stack>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ marginBottom: '24px', color: theme.palette.primary.main }}>
              Звязатися з нами
            </Typography>
            <Stack spacing={2}>
              <Link to="tel:+3800955040001" style={{ textDecoration: 'none', color: '#000' }}>
                <Typography
                  variant="body2"
                  sx={{
                    ':hover': {
                      color: '#CB3C2E',
                    },
                  }}
                >
                  +380 (095) 504 - 00 - 01
                </Typography>
              </Link>
              <Link to="mailto:foodsparks@gmail.com" style={{ textDecoration: 'none', color: '#000' }}>
                <Typography
                  variant="body2"
                  sx={{
                    ':hover': {
                      color: '#CB3C2E',
                    },
                  }}
                >
                  foodsparks@gmail.com
                </Typography>
              </Link>
            </Stack>
          </Box>
        </Box>
        <Box sx={{ marginBottom: '24px' }}>
          <img src={OrnamentSvg} style={{ width: '100%' }} alt='ornament' />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alighnItems: 'center', paddingBottom: '32px' }}>
          <Typography sx={{ textAlign: 'center', color: '#212529' }} variant='body2'>© 2023 Foodsparks. All Rights Reserved. </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer;