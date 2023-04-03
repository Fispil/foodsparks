import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRecipeById } from '../api/fetchRecepies';
import RecipeExtended, { IngredientList } from '../types/recipe';
import Breadcrumb from '../components/BreadCrums';
import { Box, Container, Divider, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
        <Breadcrumb nameRecipe={recipe?.dishName}/>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <img src={recipe?.imageUrl} alt="recipe" />
          </Box>
          <Box>
            <Typography variant='h3'>{recipe?.dishName}</Typography>
            <Typography variant='subtitle1'>{recipe?.dishName}</Typography>
            <Divider />
            <Typography variant='body1'>{recipe?.dishName}</Typography>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  {recipe?.portions} Порцій
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <AccessTimeIcon /> {recipe?.cookingTime}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography variant='h3'> Вам знадобляться такі інгрідієнти</Typography>
        </Box>
        <Box>
          <Typography variant='h3'> Рецепт приготовування: {recipe?.dishName}</Typography>
        </Box>
      </Container>
    </>
  )
}

export default ProductPage;