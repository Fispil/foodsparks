import { useEffect, useState } from 'react';
import { Box, Button, Container, Divider, Grid, Stack, TextField, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { getDishTypes, getRecipes } from '../api/fetchRecepies';
import Recipe from '../types/recipe';
import CustomCarousel from '../components/CustomCarousel';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import CustomCardList from '../components/CustomCardList';
import CuisineRegion from '../types/cuisineRegions';
import { getCuisineRegion } from '../api/fetchCuisineRegion';
import DishType from '../types/dishTypes';

const useStyles = makeStyles((theme: Theme) => ({
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center'
  },

  carouselContainer: {
    backgroundColor: "#0F0F10",
    maxWidth: '100%',
    boxSizing: 'border-box',
    padding: '40px 0',
    position: 'relative'
  },
  carouselTitle: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '38px',
    lineHeight: '57px',
    color: '#fff',
  },
  dividerDashed: {
    borderBottom: '5px dashed #cb3c2e',
    borderColor: '#cb3c2e',
  },
  divider: {
    borderBottom: '5px solid #cb3c2e',
    borderColor: '#cb3c2e',
  },
}));

const MainPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [cuisineRegions, setCuisineRegions] = useState<CuisineRegion[]>([])
  const [dishTypes, setDishtypes] = useState<DishType[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [promocodeInput, setPromocodeInput] = useState('');
  const topCatergories = ['Основні страви', 'Перші страви', 'Закуски', 'Десерти', 'Випічка'];

  const loadRecepiesFromServer = async () => {
    try {
      setIsLoading(true);
      const [dishTypesFromServer, cuisineRegionFromServer, recipesFromServer] = await Promise.all([
        getDishTypes(),
        getCuisineRegion(),
        getRecipes(),
      ]);

      setDishtypes(dishTypesFromServer);
      setCuisineRegions(cuisineRegionFromServer);
      setRecipes(recipesFromServer);
    } catch (err) {
      throw new Error(`Cant get recipes from server: ${err}`)
    } finally {
      setIsLoading(false);
    };
  }

  const handlePromocodeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromocodeInput(event.target.value);
  }

  const handlePromoSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('promo sent')
  };

  useEffect(() => {
    loadRecepiesFromServer();
  }, []);

  const classes = useStyles();

  return (
    <>
      <Box className={classes.carouselContainer}>
        <Container maxWidth="xl">
          <Typography variant='h2' className={classes.carouselTitle}>Підбірки української кухні</Typography>
          <CustomCarousel items={cuisineRegions} />
        </Container>
      </Box>
      <Box>
        <Container maxWidth="xl">
          <Box className={classes.flexContainer} sx={{ margin: '45px 0' }}>
            <Typography variant='h4'>Рецепти української кухні</Typography>
            <Button
              variant="contained"
              endIcon={<KeyboardArrowRightIcon fontSize="large" sx={{ color: '#fff' }} />}
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
                Всі рецепти
              </Link>
            </Button>
          </Box>
          <Divider sx={{ backgroundColor: 'grey', marginBottom: '40px' }} />
          {dishTypes.map(category => (
            <Box key={category.id} sx={{ marginBottom: '40px' }}>
              <Box sx={{ marginBottom: '40px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                  <Typography variant='h4' sx={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
                    <img src="src/pictures/catergoriesicon.svg" alt="categoryimage" style={{ marginRight: '16px' }} />
                    {category.dishTypeName}
                  </Typography>
                  <Link
                    to="/products"
                    style={{
                      textDecoration: 'none',
                      color: '#CB3C2E',
                      fontFamily: 'Open Sans',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px'
                    }}
                  >
                    Показати всі
                  </Link>
                </Box>

                <CustomCardList items={recipes.filter(item => item.dishType === category.dishTypeName)} />
              </Box>
              <Divider sx={{ backgroundColor: 'black' }} />
            </Box>
          ))}
          <Box sx={{ backgroundColor: 'black', marginBottom: '40px', height: '370px', padding: '40px' }}>
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
            <Divider sx={{ backgroundColor: '#fff' }} />
            <form onSubmit={handlePromoSumbit}>
              <Grid
                container
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '40px'
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
                      width: '240px',
                      height: '64px',
                      background: '#CB3C2E',
                    }}>
                    Надіслати
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container >
      </Box >
    </>
  );
}

export default MainPage;