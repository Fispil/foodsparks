import { Box, Typography, Divider, Grid, TextField, Button } from "@mui/material"
import { useState } from "react";

const Promo = () => {
  const [promocodeInput, setPromocodeInput] = useState('');

  const handlePromocodeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromocodeInput(event.target.value);
  }

  const handlePromoSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('promo sent')
  };

  return (
    <Box sx={{ backgroundColor: 'black', marginBottom: '120px', height: '370px', padding: '40px', position: 'relative', borderRadius: '24px' }}>
      <Typography
        variant='h2'
        sx={{
          color: '#fff',
          marginBottom: '24px',
          fontFamily: 'Open Sans',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '38px',
          lineHeight: '57px'
        }}>
        Отримайте знижку 20%<br />
        на перше замовлення
      </Typography>
      <Typography
        variant='h6'
        sx={{
          color: '#fff',
          marginBottom: '24px',
          fontFamily: 'Open Sans',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '24px'
        }}
      >
        Введіть електронну адресу та отримайте промокод
      </Typography>

      <img src='src/pictures/promoimage.svg' alt="promoimage" style={{ position: 'absolute', bottom: 0, right: 0, margin: '20px -85px' }} />
      <Divider sx={{ backgroundColor: '#fff' }} />
      <form onSubmit={handlePromoSumbit}>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '40px',
          }}
        >
          <Grid item sm={9}>
            <TextField
              fullWidth
              value={promocodeInput}
              onChange={handlePromocodeInputChange}
              placeholder="Введіть свою почту"
              id="email"
              type="email"
              sx={{ backgroundColor: '#fff', borderRadius: '12px' }}
            />
          </Grid>
          <Grid item sm={1} />
          <Grid item sm={2}>
            <Button
              variant="contained"
              sx={{
                borderRadius: '12px',
                backgroundColor: 'rgb(176,224,230)',
                color: '#fff',
                padding: '16px 24px',
                fontWeight: 400,
                width: '100%',
                height: '64px',
                background: '#CB3C2E',
              }}>
              Надіслати
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default Promo