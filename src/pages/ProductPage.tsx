import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRecipeById } from '../api/fetchRecepies';
import RecipeExtended from '../types/fullrecipe';
import Breadcrumb from '../components/BreadCrums';
import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductPage = () => {
  const [recipe, setRecipe] = useState<RecipeExtended>();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const pathnames = location.pathname.split('/');

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
      <Container maxWidth="lg">
        <Breadcrumb nameRecipe={recipe?.title} />
        <Grid container>
          <Grid item
            sx={{
              height: 530,
              width: 620,
              marginRight: '32px',
              backgroundImage: `url(${recipe?.imageUrl})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'contain',
              backgroundSize: 'cover'
            }}>
          </Grid>
          <Grid item>
            <Typography variant='h3'>{recipe?.title}</Typography>
            <Typography variant='subtitle1'>{recipe?.title}</Typography>
            <Divider sx={{ backgroundColor: '#8E8F96' }} />
            <Box sx={{ backgroundColor: '#F5F5F5'}}>
              <Typography variant='body1'>{recipe?.subtitle}</Typography>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '30px' }}>
                <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <img src="src\pictures\PlateIcon.png" alt="plate icon" />
                  {recipe?.portions} Порцій
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <AccessTimeIcon /> {recipe?.cookingTime}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box>
          <Typography variant='h3'> Вам знадобляться такі інгрідієнти</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {recipe?.productsList.map(item => (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>{item.name} - {item.amount}</Typography>
                  <Button variant='contained'>Купити <ShoppingCartIcon /></Button>
                </Box>
                <Divider sx={{ backgroundColor: '#8E8F96' }} />
              </>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Всього</Typography>
            <Typography>0.00грн</Typography>
          </Box>
          <Divider />
        </Box>
        <Box>
          <Typography variant='h3'> Рецепт приготовування: {recipe?.title}</Typography>
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
        </Box>
      </Container>
    </>
  )
}

export default ProductPage;