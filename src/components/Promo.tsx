import { Box, Typography, Divider, Grid, TextField, Button } from "@mui/material"
import { useState } from "react";
import { sentCoupon } from "../api/fetchCoupons";
import PromoImage from "../assets/promoimage.svg";
import { useAppDispatch } from "../util/hooks";
import { actions as snackActions } from "../features/snackReducer";

const Promo = () => {
  const [promocodeInput, setPromocodeInput] = useState('');
  const dispatch = useAppDispatch();

  const handlePromocodeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromocodeInput(event.target.value);
  }

  const handlePromoSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isPromoSent = await sentCoupon(promocodeInput);
    if (typeof isPromoSent === 'object' && isPromoSent.isAxiosError && isPromoSent.response?.data) {
      dispatch(snackActions.setMessage(isPromoSent.response.data.message));
      dispatch(snackActions.setSeverity('error'));
      dispatch(snackActions.setIsActive(true));
      return;
    }

    dispatch(snackActions.setMessage('Ви успішно отримали купон на знижку'));
    dispatch(snackActions.setIsActive(true));
  };

  return (
    <Box sx={{ backgroundColor: 'black', marginBottom: '120px', height: '370px', padding: '40px', position: 'relative', borderRadius: '24px' }}>
      <Typography
        variant='h5'
        sx={{
          position: 'relative',
          color: '#fff',
          marginBottom: '24px',
          zIndex: 1
        }}>
        Отримайте знижку 20%<br />
        на перше замовлення
      </Typography>
      <Typography
        variant='body2'
        sx={{
          position: 'relative',
          color: '#fff',
          marginBottom: '24px',
          zIndex: 1
        }}
      >
        Введіть електронну адресу та отримайте промокод
      </Typography>

      <img src={PromoImage} alt="promoimage" style={{ position: 'absolute', bottom: 0, right: 0, margin: '20px -85px', zIndex: 0 }} />
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
              placeholder="Введіть свою пошту"
              id="email"
              type="email"
              sx={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                fontFamily: 'Open Sans',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
              }}
            />
          </Grid>
          <Grid item sm={1} />
          <Grid item sm={2}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                borderRadius: '12px',
                backgroundColor: 'rgb(176,224,230)',
                color: '#fff',
                padding: '16px 24px',
                fontWeight: 400,
                width: '100%',
                height: '64px',
                background: '#CB3C2E',
                textTransform: 'none'
              }}>
              <Typography variant="body2">Надіслати</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default Promo