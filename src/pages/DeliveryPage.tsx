import { Box, Container, Divider, Grid, Stack, Typography } from '@mui/material';

const DeliveryPage: React.FC = () => {
  return (
    <Container sx={{ padding: '72px' }}>
      <Typography variant='subtitle1' sx={{ marginBottom: '40px' }}>
        Умови доставки
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Stack spacing={5}>
            <Box sx={{ backgroundColor: '#000', color: '#fff', padding: '40px', borderRadius: '24px' }}>
              <Typography variant='subtitle1' sx={{ marginBottom: '24px' }}>
                Час доставки
              </Typography>
              <Divider sx={{ backgroundColor: '#fff', marginBottom: '24px' }} />
              <Typography variant='subtitle2'>
                Доставка здійснюється кур'єром з понеділка по п'ятницю з 8:00 до 14:00 та з 16:00 до 21:00. Замовлення, що оформлене у будній день (з понеділка по четвер) до 18:00, буде доставлене на наступний день. Замовлення, оформлене у четвер після 18:00, у п’ятницю, суботу або неділю до 18:00, буде доставлене у понеділок. Також зручну дату доставки можете обрати на сторінці оформлення замовлення перед оплатою.
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#000', color: '#fff', padding: '40px', borderRadius: '24px' }}>
              <Typography variant='subtitle1' sx={{ marginBottom: '24px' }}>
                Доставка у Києві
              </Typography>
              <Divider sx={{ backgroundColor: '#fff', marginBottom: '24px' }} />
              <Typography variant='subtitle2'>
                Доставка у Києві здійснюється зазвичай
                у будні з 9:00 до 21:00,
                у Львові та Одесі кожен день з 11:00 до 17:00.<br />
                <br />
                Якщо маєте побажання по часу доставки, вкажіть про це у коментарі до замовлення або за телефоном +38 (068) 674 99 80.
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#000', color: '#fff', padding: '40px', borderRadius: '24px' }}>
              <Typography variant='subtitle1' sx={{ marginBottom: '24px' }}>
                Доставка у Львові
              </Typography>
              <Divider sx={{ backgroundColor: '#fff', marginBottom: '24px' }} />
              <Typography variant='subtitle2'>
                Доставка здійснюється кожен день з 11:00 до 17:00. Замовлення, оформлене у поточний день до 18:00, буде доставлене завтра.
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item sm={6}>
          <Stack spacing={5}>
            <Box sx={{ backgroundColor: '#000', color: '#fff', padding: '40px', borderRadius: '24px' }}>
              <Typography variant='subtitle1' sx={{ marginBottom: '24px' }}>
                Мінімальна сума замовлення
              </Typography>
              <Divider sx={{ backgroundColor: '#fff', marginBottom: '24px' }} />
              <Typography variant='subtitle2'>
                При оформленні замовлення менше, ніж на 1000 грн, доставка коштує 150 грн. При замовленні від 1000 грн — доставка безкоштовна.
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#000', color: '#fff', padding: '40px', borderRadius: '24px' }}>
              <Typography variant='subtitle1' sx={{ marginBottom: '24px' }}>
                Формат оплати
              </Typography>
              <Divider sx={{ backgroundColor: '#fff', marginBottom: '24px' }} />
              <Typography variant='subtitle2'>
                Оплата здійснюється онлайн за допомогою системи електронних платежів.
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#000', color: '#fff', padding: '40px', borderRadius: '24px' }}>
              <Typography variant='subtitle1' sx={{ marginBottom: '24px' }}>
                Доставка в Одесі
              </Typography>
              <Divider sx={{ backgroundColor: '#fff', marginBottom: '24px' }} />
              <Typography variant='subtitle2'>
                Доставка здійснюється кожен день з 11:00 до 17:00. Замовлення, оформлене у поточний день до 18:00, буде доставлене завтра.
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DeliveryPage;
