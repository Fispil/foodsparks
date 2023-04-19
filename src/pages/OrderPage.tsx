import { Box, Typography, Stack, Grid, IconButton, Divider, Button, Container, TextField, Paper, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import CartButton from "../components/СartButton";
import { useState, useEffect } from "react";
import { getitemsCart, removeItemCart, deleteAllItemsCart } from "../api/fetchCart";
import { useAppSelector, useAppDispatch } from "../util/hooks";
import { actions as userActions } from '../features/userReduser';
import DeleteIcon from '../assets/deleteicon.svg';
import { Link } from "react-router-dom";
import Breadcrumb from "../components/BreadCrums";
import Cart from "../components/Cart";

const OrderPage: React.FC = () => {
  const isLoggined = useAppSelector(state => state.user.isLoggined);
  const userShoppingCart = useAppSelector(state => state.user.userShoppingCart);
  const userInformation = useAppSelector(state => state.user.userInformation);
  const userAddress = useAppSelector(state => state.user.userAddress);
  const dispatch = useAppDispatch();
  const [promo, setPromo] = useState('');
  const [city, setCity] = useState(0);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [cellPhoneNumber, setCellPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');
  const [appartment, setAppartment] = useState(0);

  const handleCellPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCellPhoneNumber(event.target.value);
  }

  const handlePromoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromo(event.target.value);
  }

  const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(event.target.value);
  }

  const handleBuildingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuilding(event.target.value);
  }

  const handleAppartmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      setAppartment(event.target.value as unknown as number);
    }
  }

  const handleCityChange = (event: SelectChangeEvent<unknown>) => {
    setCity(event.target.value as number);
  };

  const handleTimeChange = (event: SelectChangeEvent<unknown>) => {
    setTime(event.target.value as string);
  };

  const handleDateChange = (event: SelectChangeEvent<unknown>) => {
    setDate(event.target.value as string);
  };

  const setDefaultValues = () => {
    if (userInformation.phone) {
      setCellPhoneNumber(userInformation.phone);
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
    setDefaultValues();
  }, [])

  return (
    <Container maxWidth="xl">
      <Breadcrumb />
      <Typography variant="h6" sx={{ marginBottom: '24px' }}>
        Особисті дані
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <Stack spacing={2}>
          <Typography>Імя</Typography>
          <TextField
            placeholder="Введіть ваше ім'я"
            fullWidth
            value={userInformation.firstName}
            disabled
          />
        </Stack>
        <Stack spacing={2}>
          <Typography>Фамілія</Typography>
          <TextField placeholder="Введіть вашу прізвище" value={userInformation.lastName} disabled />
        </Stack>
        <Stack spacing={2}>
          <Typography>Мобільний номер</Typography>
          <TextField placeholder="Введіть мобільний телефон" value={cellPhoneNumber} onChange={handleCellPhoneChange} />
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
                  value={city}
                  onChange={handleCityChange}
                  fullWidth
                  label="Місто"
                >
                  <MenuItem value="">
                    <em>Нічого</em>
                  </MenuItem>
                  <MenuItem value={1}>Київ</MenuItem>
                  <MenuItem value={2}>Одеса</MenuItem>
                  <MenuItem value={3}>Львів</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Stack>
          <Stack gap={1}>
            <Typography variant="body1">Будинок</Typography>
            <TextField
              placeholder="Хрещатик, 7"
              fullWidth
              value={building}
              onChange={handleBuildingChange}
            />
          </Stack>
        </Stack>
        <Stack minWidth="48%" gap={4}>
          <Stack gap={1}>
            <Typography variant="body1">Вулиця</Typography>
            <TextField
              placeholder="Введіть вашу вулицю"
              fullWidth
              value={street}
              onChange={handleStreetChange}
            />
          </Stack>
          <Stack gap={1}>
            <Typography variant="body1">Квартира</Typography>
            <TextField
              placeholder="Введіть номер вашої квартири"
              fullWidth
              value={appartment}
              onChange={handleAppartmentChange}
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
                value={date}
                onChange={handleDateChange}
                fullWidth
                label="Дата доставки"
              >
                <MenuItem value="">
                  <em>Нічого</em>
                </MenuItem>
                <MenuItem value={'Взавтра'}>Взавтра</MenuItem>
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
                value={time}
                onChange={handleTimeChange}
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
          />
        </Stack>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Ваше замовлення</Typography>
        <Paper sx={{ borderRadius: '12px' }}>
          <Stack gap={3} sx={{ padding: '32px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Промокод</Typography>
            </Box>
            <TextField
              placeholder="Введіть ваш промокод"
              fullWidth
              value={promo}
              onChange={handlePromoChange}
            />
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
              </Link>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}

export default OrderPage