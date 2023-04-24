import { useEffect, useState } from 'react';
import { Box, Button, Container, Divider, Grid, TextField, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { getRecipes } from '../api/fetchRecepies';
import Recipe from '../types/recipe';
import CustomCarousel from '../components/CustomCarousel';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import CustomCardList from '../components/CustomCardList';
import CuisineRegion from '../types/cuisineRegions';
import { getCuisineRegion, getDishTypes } from '../api/fetchTypes';
import DishType from '../types/dishTypes';
import Promo from '../components/Promo';
import CategoryIcon from '../assets/catergoriesicon.svg';
import { informationByUser, adressByUser } from '../api/fetchUser';
import { useAppDispatch, useAppSelector } from '../util/hooks';
import { actions as userActions } from '../features/userReduser';
import ScrollToTop from '../components/ScrollToTop';

const useStyles = makeStyles(({
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
}));

const MainPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [cuisineRegions, setCuisineRegions] = useState<CuisineRegion[]>([])
  const [dishTypes, setDishtypes] = useState<DishType[]>([])
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const userInformation = useAppSelector((state) => state.user.userInformation);
  const userAddress = useAppSelector((state) => state.user.userAddress);
  const userIsLoggined = useAppSelector((state) => state.user.isLoggined);

  const loadUserFromServer = async () => {
    try {
      const [userFromServer, userAddressFromServer] = await Promise.all([
        await informationByUser(),
        await adressByUser(),
      ]);
      
      dispatch(userActions.setUserInformation(userFromServer));
      dispatch(userActions.setUserAddress(userAddressFromServer));

    } catch (error) {
      throw new Error(`Cant handle load: ${error}`)
    }
  }

  useEffect(() => {
    if(userIsLoggined) {
      loadUserFromServer();
    }  
  }, [userIsLoggined])

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
      setRecipes(recipesFromServer.content);
    } catch (err) {
      throw (`${err}`)
    } finally {
      setIsLoading(false);
    };
  }

  useEffect(() => {
    loadRecepiesFromServer();
  }, []);

  const classes = useStyles();

  return (
    <>
      <Box className={classes.carouselContainer}>
        <Box sx={{ padding: '40px 16px' }}>
          <Typography variant='h5' sx={{ paddingLeft: '80px' }} className={classes.carouselTitle}>Підбірки української кухні</Typography>
          <CustomCarousel items={cuisineRegions} />
        </Box>
      </Box>
      <Box>
        <Container maxWidth="xl">
          <Box className={classes.flexContainer} sx={{ margin: '45px 0' }}>
            <Typography variant='h6'>Рецепти української кухні</Typography>
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
                <Typography variant='body1'>Всі рецепти</Typography>
              </Link>
            </Button>
          </Box>
          <Divider sx={{ backgroundColor: 'grey', marginBottom: '40px' }} />
          {dishTypes.map(category => (
            <Box key={category.id} sx={{ marginBottom: '40px' }}>
              <Box sx={{ marginBottom: '40px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                  <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
                    <img src={CategoryIcon} alt="categoryimage" style={{ marginRight: '16px' }} />
                    {category.dishTypeName}
                  </Typography>
                  <Link
                    to="/products"
                    style={{
                      textDecoration: 'none',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#CB3C2E',
                        '&:hover': {
                          color: 'black',
                        },
                      }}
                    >
                      Показати всі
                    </Typography>
                  </Link>
                </Box>
                <CustomCardList items={recipes.filter(item => item.dishType === category.dishTypeName)} />
              </Box>
            </Box>
          ))}
          <Divider sx={{ backgroundColor: 'black', marginBottom: '64px' }} />
          <Promo />
        </Container >
      </Box >
      <ScrollToTop />
    </>
  );
}

export default MainPage;