import { Box, Typography, Stack, Divider, Button, Container, TextField, Paper, FormControl, InputLabel, MenuItem, Select, Grid } from "@mui/material"
import { useState, useEffect } from "react";
import { deleteAllItemsCart, sentPromoFromUser } from "../api/fetchCart";
import { useAppSelector, useAppDispatch } from "../util/hooks";
import { actions as userActions } from '../features/userReduser';
import DeleteIcon from '../assets/deleteicon.svg';
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/BreadCrums";
import Cart from "../components/Cart";
import { makeUserOrder } from "../api/fetchUser";
import { UserOrder } from "../types/user";

const OrderPage: React.FC = () => {
  const isLoggined = useAppSelector(state => state.user.isLoggined);
  const userShoppingCart = useAppSelector(state => state.user.userShoppingCart);
  const userInformation = useAppSelector(state => state.user.userInformation);
  const userAddress = useAppSelector(state => state.user.userAddress);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [promo, setPromo] = useState('');
  const [userOrder, setUserOrder] = useState<UserOrder>({
    firstName: '',
    lastName: '',
    phone: '',
    town: '',
    street: '',
    build: '',
    apartment: 0,
    comment: '',
    dayOfDelivery: '',
    timeOfDelivery: '',
  });

  const handleUserOrderChange = (name: keyof UserOrder) => (value: string | number) => {
    setUserOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handlePromoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromo(event.target.value)
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await makeUserOrder(userOrder);

   navigate('/successfulorder');
  };

  const setDefaultValues = () => {
    if (userInformation.firstName) {
      setUserOrder((prevOrder) => ({
        ...prevOrder,
        firstName: userInformation.firstName,
      }));
    }
    if (userInformation.lastName) {
      setUserOrder((prevOrder) => ({
        ...prevOrder,
        lastName: userInformation.lastName,
      }));
    }
    if (userInformation.phone) {
      setUserOrder((prevOrder) => ({
        ...prevOrder,
        phone: userInformation.phone,
      }));
    }
    if (userAddress.apartment) {
      setUserOrder((prevOrder) => ({
        ...prevOrder,
        apartment: userAddress.apartment,
      }));
    }
    if (userAddress.build) {
      setUserOrder((prevOrder) => ({
        ...prevOrder,
        build: userAddress.build,
      }));
    }
    if (userAddress.street) {
      setUserOrder((prevOrder) => ({
        ...prevOrder,
        street: userAddress.street,
      }));
    }
    if (userAddress.town) {
      setUserOrder((prevOrder) => ({
        ...prevOrder,
        town: userAddress.town,
      }));
    }
  }

  const handleClearShoppingCart = async () => {
    try {
      const userCartFromServer = await deleteAllItemsCart();
      dispatch(userActions.setShoppingCart(userCartFromServer));
    } catch (error) {
      throw new Error(`Cant load cart: ${error}`);
    }
  };

  const promoSumbitHandler = async () => {
    try {
      const isPromoValid = await sentPromoFromUser(promo);
      dispatch(userActions.setShoppingCart(isPromoValid));
    } catch (error) {
      throw new Error(`Promo is not valid: ${error}`)
    }
  }

  useEffect(() => {
    setDefaultValues();
  }, [])

  return (
    <Container maxWidth="xl">
      <Breadcrumb />
      <Typography variant="h6" sx={{ marginBottom: '24px' }}>
        Особисті дані
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <Stack spacing={2}>
            <Typography>Імя</Typography>
            <TextField
              placeholder="Введіть ваше ім'я"
              fullWidth
              value={userInformation.firstName}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography>Фамілія</Typography>
            <TextField placeholder="Введіть вашу прізвище" value={userInformation.lastName}/>
          </Stack>
          <Stack spacing={2}>
            <Typography>Мобільний номер</Typography>
            <TextField placeholder="Введіть мобільний телефон" value={userOrder.phone} onChange={(e) => handleUserOrderChange('phone')(e.target.value)} />
          </Stack>
        </Box>

        <Typography variant="h6" sx={{ marginBottom: '24px' }}>
          Деталі доставки
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Stack minWidth="48%" gap={4}>
            <Stack gap={1}>
              <Typography variant="body1">Місто</Typography>
              <div>
                <FormControl sx={{ m: 1, minWidth: '100%' }}>
                  <InputLabel id="demo-simple-select-autowidth-label">Місто</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    value={userOrder.town}
                    onChange={(e) => handleUserOrderChange('town')(e.target.value)}
                    fullWidth
                    label="Місто"
                  >
                    <MenuItem value="">
                      <em>Нічого</em>
                    </MenuItem>
                    <MenuItem value={'Київ'}>Київ</MenuItem>
                    <MenuItem value={'Одеса'}>Одеса</MenuItem>
                    <MenuItem value={'Львів'}>Львів</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Stack>
            <Stack gap={1}>
              <Typography variant="body1">Будинок</Typography>
              <TextField
                placeholder="Хрещатик, 7"
                fullWidth
                value={userOrder.build}
                onChange={(e) => handleUserOrderChange('build')(e.target.value)}
              />
            </Stack>
          </Stack>
          <Stack minWidth="48%" gap={4}>
            <Stack gap={1}>
              <Typography variant="body1">Вулиця</Typography>
              <TextField
                placeholder="Введіть вашу вулицю"
                fullWidth
                value={userOrder.street}
                onChange={(e) => handleUserOrderChange('street')(e.target.value)}
              />
            </Stack>
            <Stack gap={1}>
              <Typography variant="body1">Квартира</Typography>
              <TextField
                placeholder="Введіть номер вашої квартири"
                fullWidth
                value={userOrder.apartment}
                onChange={(e) => handleUserOrderChange('apartment')(e.target.value)}
              />
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{ border: '1px solid #ADB5BD', marginBottom: '24px' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <Stack minWidth="48%" gap={1}>
            <Typography variant="body1">Виберіть зручну для вас дату доставки</Typography>
            <div>
              <FormControl sx={{ m: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-autowidth-label">Дата доставки</InputLabel>
                <Select
                  labelId="Дата доставки"
                  value={userOrder.dayOfDelivery}
                  onChange={(e) => handleUserOrderChange('dayOfDelivery')(e.target.value)}
                  fullWidth
                  label="Дата доставки"
                >
                  <MenuItem value="">
                    <em>Нічого</em>
                  </MenuItem>
                  <MenuItem value={'Взавтра'}>Завтра</MenuItem>
                  <MenuItem value={'Післязавтра'}>Післязавтра</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Stack>
          <Stack minWidth="48%" gap={1}>
            <Typography variant="body1">Виберіть зручний для вас час доставки</Typography>
            <div>
              <FormControl sx={{ m: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-autowidth-label">Дата доставки</InputLabel>
                <Select
                  labelId="Дата доставки"
                  value={userOrder.timeOfDelivery}
                  onChange={(e) => handleUserOrderChange('timeOfDelivery')(e.target.value)}
                  fullWidth
                  label="Час доставки"
                >
                  <MenuItem value="">
                    <em>Нічого</em>
                  </MenuItem>
                  <MenuItem value={'До 18:00'}>До 18:00</MenuItem>
                  <MenuItem value={'Після 18:00'}>Після 18:00</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <Typography variant="subtitle1">Кошик</Typography>
          <Button variant='text' onClick={handleClearShoppingCart} sx={{ textTransform: 'none' }} startIcon={<img src={DeleteIcon} alt='delete icon' />}>
            <Typography variant="body2" sx={{ padding: '8px' }}>Очистити кошик</Typography>
          </Button>
        </Box>

        <Cart />

        <Stack gap={3}>
          <Stack gap={3}>
            <Typography>Коментар до замовлення</Typography>
            <TextField
              id="outlined-textarea"
              placeholder="Тут ви можете залишити побажання щодо товару "
              multiline
              rows={5}
              sx={{ borderRadius: '12px' }}
              value={userOrder.comment}
              onChange={(e) => handleUserOrderChange('comment')(e.target.value)}
            />
          </Stack>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Ваше замовлення</Typography>
          <Paper sx={{ borderRadius: '12px' }}>
            <Stack gap={3} sx={{ padding: '32px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>Промокод</Typography>
              </Box>
              <Grid container>
                <Grid item sm={9}>
                  <TextField
                    placeholder="Введіть ваш промокод"
                    fullWidth
                    value={promo}
                    onChange={handlePromoChange}
                  />
                </Grid>
                <Grid item sm={1} />
                <Grid item sm={2}>
                  <Button
                    variant='contained'
                    onClick={promoSumbitHandler}
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
                    <Typography variant="body1">Застосувати</Typography>
                  </Button>
                </Grid>
              </Grid>
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
                <Button
                  variant='contained'
                  type="submit"
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
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </form>
    </Container>
  )
}

export default OrderPage