import { Container, Typography, Box, Button, Card, CardActions, CardContent, CardMedia, Pagination } from '@mui/material';
import Breadcrumb from '../components/BreadCrums';
import { useEffect, useState } from 'react';
import { getByPageRecipes, getRecipes } from '../api/fetchRecepies';
import Recipe from '../types/recipe';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ForwardIcon from '@mui/icons-material/Forward';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Link } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const maxPages = 4;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  const handleAddRecipes = () => {
    if (page !== maxPages) {
      setPage(currentPage => currentPage + 1);
      addRecepiesFromServer();
    }
  }

  const addRecepiesFromServer = async () => {
    try {
      setIsLoading(true);
      const recipesFromServer = await getByPageRecipes(page);

      setRecipes(currentRecipes => [...currentRecipes, recipesFromServer].flat());
    } catch (err) {
      throw new Error(`Cant get recipes from server: ${err}`)
    } finally {
      setIsLoading(false);
    };
  }

  const loadRecepiesFromServer = async () => {
    try {
      setIsLoading(true);
      const recipesFromServer = await getByPageRecipes(page);

      setRecipes(recipesFromServer);
    } catch (err) {
      throw new Error(`Cant get recipes from server: ${err}`)
    } finally {
      setIsLoading(false);
    };
  }

  useEffect(() => {
    loadRecepiesFromServer();
  }, [page]);

  return (
    <Container maxWidth="xl">
      <Breadcrumb />
      <Typography variant="h3">Рецепти української кухні</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='text' startIcon={<FilterAltIcon />}>Фільтри</Button>
        <Button variant='text' startIcon={<SyncAltIcon sx={{ rotate: '90deg' }} />}>Сортувати</Button>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' }}>
        {recipes.map((item) => (
          <Card key={item.id} sx={{ width: 304, height: 320, flex: '0 0 auto', margin: '0 8px' }}>
            <CardMedia
              sx={{ height: 140 }}
              image={item.imageUrl}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.dishName}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {item.portions} Порцій
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <AccessTimeIcon /> {item.cookingTime}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small">Add to cart</Button>
              <Button size="small">
                <Link to={`/products/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>Learn More</Link>
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center ' }}>
        <Button
          variant="text"
          startIcon={<ForwardIcon sx={{ rotate: '90deg' }} />}
          onClick={handleAddRecipes}
        >
          Показати ще
        </Button>
      </Box>
      <Pagination
        sx={{ display: 'flex', justifyContent: 'center' }}
        variant="outlined"
        shape="rounded"
        count={4}
        page={page}
        onChange={handlePageChange}
      />
    </Container>
  );
}

export default ProductsPage;