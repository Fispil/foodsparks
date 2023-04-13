import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRecipeById } from '../api/fetchRecepies';
import RecipeExtended from '../types/recipeExtended';
import { Box, Button, Container, Divider, Grid, Typography, Theme, Stack } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { makeStyles } from '@mui/styles';
import Promo from '../components/Promo';

const useStyles = makeStyles((theme: Theme) => ({
  aboutContainer: {
    backgroundColor: "#0F0F10",
    maxWidth: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    marginBottom: '40px'
  },
  aboutTitle: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '38px',
    lineHeight: '57px',
    color: '#fff',
  },
  aboutContent: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '32px',
    lineHeight: '48px',
    color: '#fff',
  },
}));

const ProductPage = () => {
  const [recipe, setRecipe] = useState<RecipeExtended>();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const pathnames = location.pathname.split('/');

  const classes = useStyles();

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
              <Typography variant='h3' className={classes.aboutTitle}>{recipe?.title}</Typography>
              <Divider sx={{ backgroundColor: '#8E8F96', width: '75%' }} />
              <Typography variant='subtitle1' className={classes.aboutContent}>{recipe?.subtitle}</Typography>
            </Grid>
            <Grid item sm={6}>
              <Box sx={{
                minHeight: '535px',
                minWidth: '535px',
                top: '64px',
                bottom: '-64px',
                position: 'absolute',
                objectFit: 'cover',
                objectPosition: 'center',
                backgroundImage: `url(${recipe?.imageUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'contain',
                backgroundSize: 'cover'
              }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', gap: '64px', height: '88px' }}>
          <Stack>
            <img src='' alt='coockedmeal' />
            <Typography>Кількість порцій</Typography>
            <Typography>Кількість порцій</Typography>
          </Stack>
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#000', height: '32px', alighSelf: 'center', marginTop: '28px' }} />
          <Stack>
            <img src='' alt='coockedmeal' />
            <Typography>Кількість порцій</Typography>
            <Typography>Кількість порцій</Typography>
          </Stack>
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#000', height: '32px', alighSelf: 'center', marginTop: '28px' }} />
          <Stack>
            <img src='' alt='coockedmeal' />
            <Typography>Кількість порцій</Typography>
            <Typography>Кількість порцій</Typography>
          </Stack>
        </Box>
        <Box>
          <Typography variant='h4' sx={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
            <img src="src/pictures/catergoriesicon.svg" alt="categoryimage" style={{ marginRight: '16px' }} />
            Інгридієнти:
          </Typography>
          {recipe?.productsList.map(item => (
            <Box sx={{ height: '120px', marginBottom: '8px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant='h6' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '25px' }}>
                    <img src="src/pictures/catergoriesicon.svg" alt="categoryimage" style={{ marginRight: '16px' }} />
                    {item.name} - {item.amount}
                  </Typography>
                </Box>
                <Button
                  variant='outlined'
                  sx={{
                    border: '1px solid #CB3C2E',
                    textTransform: 'none', color: '#CB3C2E',
                    fontFamily: 'Open Sans',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: '16px',
                    padding: '24px 84px',
                    borderRadius: '12px'
                  }}
                  endIcon={<ShoppingCartOutlinedIcon sx={{ width: '32px', height: '32px' }} />}
                >
                  Купити
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
        <Box>
          <Typography variant='h4' sx={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
            <img src="src/pictures/catergoriesicon.svg" alt="categoryimage" style={{ marginRight: '16px' }} />
            Покроковий рецепт приготування
          </Typography>
          <Divider sx={{ backgroundColor: '#8E8F96' }} />
          {recipe?.instructions.map((item, index) => (
            <Grid container>
              <Grid item sm={1}></Grid>
              <Grid item sm={1} sx={{ width: 64, height: 64 }}>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    display: 'inline-block',
                    padding: '0.2em 0.7em',
                    borderRadius: '50%',
                  }}>
                  {index}
                </Typography>
              </Grid>
              <Grid item sm={10}>
                <Typography>{item}</Typography>
              </Grid>
            </Grid>
          ))}
          <Divider />
          <Promo />
          <Divider />
        </Box>
      </Container>
    </>
  )
}

export default ProductPage;