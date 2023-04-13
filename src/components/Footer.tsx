import { Box, Typography, Container, Theme, Stack } from '@mui/material';

import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) => ({
  footerItemTitle: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '16px',
    color: '#CB3C2E',
    marginBottom: '24px'
  },
  footerItemText: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    color: '#495057'
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Container
      maxWidth="xl"
      component="footer"
      style={{
        position: 'sticky',
        height: '135px',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alighnItems: 'center' , marginBottom: '68px'}}>
        <Box>
          <Link to="/" style={{ marginBottom: '8px' }}>
            <Box
              sx={{
                height: 50,
                width: 305,
                marginRight: '32px',
                backgroundImage: `url(src/pictures/logowhite.svg)`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'contain',
                backgroundSize: 'cover'
              }}
            />
          </Link>
          <Typography className={classes.footerItemText}>Новий сервіс доставки продуктів з<br /> покроковими рецептами для <br />приготування смачних українських<br />страв вдома.</Typography>
        </Box>
        <Box>
          <Typography className={classes.footerItemTitle}>
            Місто
          </Typography>
          <Stack spacing={2}>
            <Typography className={classes.footerItemText}>Київ</Typography>
            <Typography className={classes.footerItemText}>Львів</Typography>
            <Typography className={classes.footerItemText}>Одеса</Typography>
          </Stack>
        </Box>
        <Box>
          <Typography className={classes.footerItemTitle}>
            Сторінки
          </Typography>
          <Stack spacing={2}>
            <Typography className={classes.footerItemText}>Усі рецепти</Typography>
            <Typography className={classes.footerItemText}>Кошик</Typography>
            <Typography className={classes.footerItemText}>Доставка</Typography>
            <Typography className={classes.footerItemText}>Політика конфедиційності</Typography>
          </Stack>
        </Box>
        <Box>
          <Typography className={classes.footerItemTitle}>
            Звязатися з нами
          </Typography>
          <Stack spacing={2}>
            <Typography className={classes.footerItemText}>+380 (095) 504 - 00 - 01</Typography>
            <Typography className={classes.footerItemText}>foodsparks@gmail.com</Typography>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ marginBottom: '24px' }}>
        <img src="src/pictures/ornament.svg" style={{ width: '100%' }} alt='ornament' />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alighnItems: 'center', paddingBottom: '32px'}}>
        <Typography sx={{ textAlign: 'center', color: '#212529' }}>© 2023 Foodsparks. All Rights Reserved. </Typography>
      </Box>
    </Container >
  )
}

export default Footer;