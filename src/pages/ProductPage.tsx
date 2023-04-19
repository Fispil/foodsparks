import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRecipeById } from '../api/fetchRecepies';
import RecipeExtended from '../types/recipeExtended';
import { Box, Button, Container, Divider, Grid, Typography, Stack, useTheme } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { makeStyles } from '@mui/styles';
import Promo from '../components/Promo';
import ClockIcon from '../assets/clock.svg';
import PotIcon from '../assets/pot.svg';
import CategoryIcon from '../assets/catergoriesicon.svg';
import { useAppDispatch, useAppSelector } from '../util/hooks';
import CartButton from '../components/СartButton';


const useStyles = makeStyles(({
  aboutContainer: {
    backgroundColor: "#0F0F10",
    maxWidth: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    marginBottom: '40px'
  },
  aboutTitle: {
    fontFamily: 'Open Sans',
    fontWeight: 700,
    fontSize: '38px',
    lineHeight: '57px',
    color: '#fff',
  },
  aboutContent: {
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: '32px',
    lineHeight: '48px',
    color: '#fff',
  },

  pageContent: {
    fontFamily: 'Open Sans',
    fontWeight: 600,
    fontSize: '32px',
    lineHeight: '48px',
    color: '#212529',
  },
}));

const ProductPage = () => {
  const [recipe, setRecipe] = useState<RecipeExtended>();
  const [isLoading, setIsLoading] = useState(false);
  const [activeBlock, setActiveBlock] = useState<number[]>([]);
  const userIsLoggined = useAppSelector(state => state.user);
  const userShoppingCart = useAppSelector(state => state.user.userShoppingCart);
  const location = useLocation();
  const pathnames = location.pathname.split('/');

  const classes = useStyles();
  const theme = useTheme();

  const loadRecipeFromServer = async () => {
    try {
      setIsLoading(true);
      const recipeFromServer = await getRecipeById(+pathnames[pathnames.length - 1]);
      setRecipe(recipeFromServer);
    } catch (err) {
      throw new Error(`Cant get recipes from server: ${err}`)
    } finally {
      setIsLoading(false);
    };
  }

  const openCartButtonHandler = (itemToHandle: number) => {
    setActiveBlock(state => [...state, itemToHandle]);
  };

  useEffect(() => {
    loadRecipeFromServer();
  }, [location])

  return (
    <>
      <Box className={classes.aboutContainer}>
        <Container
          maxWidth="xl"
          sx={{
            height: '470px',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Grid container>
            <Grid item sm={6}>
              <Typography variant='h5' className={classes.aboutTitle}>{recipe?.title}</Typography>
              <Divider sx={{ backgroundColor: '#8E8F96', width: '75%' }} />
              <Typography variant='subtitle1' sx={{ color: '#CED4DA' }}>{recipe?.subtitle}</Typography>
            </Grid>
            <Grid item sm={6}>
              <Box
                sx={{
                  minHeight: '535px',
                  minWidth: '535px',
                  top: '64px',
                  right: '26px',
                  position: 'absolute',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  backgroundImage: `url(${recipe?.imageUrl})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  [theme.breakpoints.down(1335)]: {
                    position: 'static',
                    minHeight: '350px',
                    minWidth: '350px',
                  },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            gap: '64px',
            height: '88px',
            marginBottom: '72px',
            [theme.breakpoints.down('lg')]: {
              gap: '32px'
            },
          }}
        >
          <Stack sx={{ alignItems: 'center' }}>
            <Box>
              <img src={ClockIcon} alt='portions' />
            </Box>
            <Typography
              variant='body2'
              sx={{
                fontFamily: 'Open Sans',
                color: '#343A40'
              }}
            >
              Кількість порцій
            </Typography>
            <Typography
              variant='body2'
              sx={{
                fontFamily: 'Open Sans',
                color: '#CB3C2E'
              }}
            >
              {recipe?.portions}
            </Typography>
          </Stack>
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#000', height: '32px', alighSelf: 'center', marginTop: '28px' }} />
          <Stack sx={{ alignItems: 'center' }}>
            <Box>
              <img src={PotIcon} alt='coockedmeal' />
            </Box>
            <Typography
              variant='body2'
              sx={{
                fontFamily: 'Open Sans',
                color: '#343A40'
              }}
            >
              Час приготування
            </Typography>
            <Typography variant='body2'
              sx={{
                fontFamily: 'Open Sans',
                color: '#CB3C2E'
              }}
            >
              {recipe?.cookingTime}
            </Typography>
          </Stack>
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#000', height: '32px', alighSelf: 'center', marginTop: '28px' }} />
          <Stack sx={{ alignItems: 'center' }}>
            <Box>
              <img src={PotIcon} alt='coockedmeal' />
            </Box>
            <Typography
              variant='body2'
              sx={{
                fontFamily: 'Open Sans',
                color: '#343A40'
              }}
            >
              Рівень складності
            </Typography>
            <Typography variant='body2'
              sx={{
                fontFamily: 'Open Sans',
                color: '#CB3C2E'
              }}
            >
              {recipe?.complexity}
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Typography
            variant='h5'
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '32px',
              fontFamily: 'Open Sans',
              fontWeight: 700,
              color: '#343A40',
            }}>
            <img src={CategoryIcon} alt="categoryimage" style={{ marginRight: '16px' }} />
            Інгридієнти:
          </Typography>
          {recipe?.productsList.map(item => (
            <Box
              key={item.productId}
              sx={{
                padding: '16px 24px',
                marginBottom: '8px',
                boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.04)',
                borderRadius: '12px',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alighItems: 'center'
                  }}
                >
                  <img src={CategoryIcon} alt="categoryimage" style={{ marginRight: '16px' }} />
                  <Typography
                    variant='body1'
                    sx={{
                      color: '#343A40',
                      textAlign: 'center'
                    }}
                  >
                    {item.name} - {item.amount}
                  </Typography>
                </Box>
                {activeBlock.includes(item.productId) ?
                  (<CartButton itemId={item.productId}
                    totalPrice={
                      userShoppingCart.productAmount.some(element => element.productId === item.productId) ?
                        userShoppingCart.productAmount.filter(element => element.productId === item.productId)[0].productSum
                        : 0
                    }
                    elementQty={
                      userShoppingCart.productAmount.some(element => element.productId === item.productId) ?
                      userShoppingCart.productAmount.filter(element => element.productId === item.productId)[0].quantityInPackages
                      : '-'}
                  />)
                  : (<Button
                    variant='outlined'
                    disabled={!userIsLoggined}
                    sx={{
                      border: '1px solid #CB3C2E',
                      textTransform: 'none',
                      color: '#CB3C2E',
                      padding: '24px 84px',
                      borderRadius: '12px'
                    }}
                    endIcon={<ShoppingCartOutlinedIcon sx={{ width: '32px', height: '32px' }} />}
                    onClick={() => openCartButtonHandler(item.productId)}
                  >
                    <Typography variant='body1'>Купити</Typography>
                  </Button>)
                }
              </Box>
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alighItems: 'center', marginBottom: '72px', padding: '16px 24px' }}>
            <Typography
              variant='h4'
              sx={{
                fontFamily: 'Open Sans',
                fontWeight: 600,
                fontSize: '32px',
                lineHeight: '48px',
                color: '#212529',
              }}
            >
              Всього
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{
                fontWeight: 600,
                color: '#212529',
              }}
            >
              {userShoppingCart.sum}грн
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            variant='subtitle1'
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px',
              fontWeight: 700,
              color: '#343A40'
            }}
          >
            <img src={CategoryIcon} alt="categoryimage" style={{ marginRight: '16px' }} />
            Покроковий рецепт приготування:
          </Typography>
          <Divider sx={{ marginBottom: '24px', border: '1px solid #495057' }} />
          {recipe?.instructions.map((item, index) => (
            <Grid
              key={item}
              container
              alignItems="center"
              sx={{
                marginBottom: '40px',
                padding: '32px',
                '&:hover': {
                  backgroundColor: '#F1F3F5',
                  borderRadius: '12px',
                  '& .stepRecipeContent': {
                    color: 'white',
                    backgroundColor: '#CB3C2E'
                  },
                },
              }}
            >
              <Grid item sm={1} justifyContent="center" alignItems="center" >
                <Box
                  className='stepRecipeContent'
                  sx={{
                    width: '64px',
                    height: '64px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                    color: '#CB3C2E',
                    border: '1px solid #CB3C2E',
                    '&:hover': {
                      backgroundColor: '#CB3C2E;',
                      color: '#fff'
                    }
                  }}
                >
                  <Typography
                    variant="h5"
                    className='stepRecipeContent'
                  >
                    {index + 1}
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={10}>
                <Typography
                  variant='subtitle1'
                  sx={{
                    fontWeight: 600,
                    color: '#212529',
                  }}
                >
                  {item}
                </Typography>
              </Grid>
            </Grid>
          ))}
          <Divider sx={{ border: '1px solid #495057', marginBottom: '24px' }} />
          <Typography
            variant='h5'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '72px',
              fontWeight: 700,
              color: '#343A40'
            }}
          >
            Смачного
          </Typography>
          <Promo />
        </Box>
      </Container >
    </>
  )
}

export default ProductPage;