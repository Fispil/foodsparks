import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRecipeById } from '../api/fetchRecepies';
import Recipe from '../types/recipe';

const ProductPage = () => {
  const [recipe, setRecipe] = useState<Recipe>();
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
    <h1>product page {pathnames}</h1>
  )
}

export default ProductPage;