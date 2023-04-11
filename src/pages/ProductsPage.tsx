import { Container, Typography, Box, Button, Card, CardActions, CardContent, CardMedia, Pagination } from '@mui/material';
import Breadcrumb from '../components/BreadCrums';
import { useEffect, useState } from 'react';
import { getByPageAndFilterRecipes, getByPageRecipes } from '../api/fetchRecepies';
import Recipe from '../types/recipe';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ForwardIcon from '@mui/icons-material/Forward';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Link } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cuisineRegionInId, setCuisineRegionInId] = useState<number[] | null>(null);
  const [dishTypeInId, setDishTypeInId] = useState<number[] | null>(null);
  const [complexityInId, setComplexityInId] = useState<number[] | null>(null);
  const [spicedIn, setSpicedIn] = useState(false)
  const [productListInId, setProductListInId] = useState<number[] | null>(null);
  const [fieldname, setFieldname] = useState('')
  const [order, setOrder] = useState('')
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
      const recipesFromServer = await 
        getByPageAndFilterRecipes(page,cuisineRegionInId,dishTypeInId,complexityInId,spicedIn,productListInId,fieldname,order)

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
      <Typography
        variant="h3"
        sx={{
          marginBottom: '32px',
          fontFamily: 'Open Sans',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '38px',
          lineHeight: '57px'
        }}
      >
        Рецепти української кухні
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
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
            padding: '12px 24px'
          }}
          endIcon={<FilterAltIcon />}
        >
          Фільтри
        </Button>
        <Button
          variant='text'
          sx={{
            textTransform: 'none',
            color: '#CB3C2E',
            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '24px',
            lineHeight: '16px',
            padding: '12px 24px'
          }}
          startIcon={<SyncAltIcon sx={{ rotate: '90deg' }} />}
        >
          Сортувати
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', marginBottom: '40px' }}>
        {recipes.map((item) => (
          <Card key={item.id} sx={{ width: 300, height: 440, flex: '0 0 auto', margin: '0 8px' }}>
            <CardMedia
              sx={{ height: 305, position: 'relative' }}
              image={item.imageUrl}
              title={item.title}
            >
              <Box sx={{ backgroundColor: '#CB3C2E', width: 'fit-content', position: 'absolute', top: '30px' }}>
                <Typography gutterBottom variant="h5" sx={{ margin: '8px 16px' }}>
                  Легкий
                </Typography>
              </Box>
            </CardMedia>
            <CardContent sx={{ marginTop: '24px' }}>
              <Link to={`/products/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{
                    fontFamily: 'Open Sans',
                    fontStyle: 'normal',
                    fontWweight: 400,
                    fontSize: '30px',
                    lineHeight: '25px',
                    marginBottom: '16px'
                  }}
                >
                  {item.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontFamily: 'Open Sans',
                      fontStyle: 'normal',
                      fontWweight: 400,
                      fontSize: '20px',
                      lineHeight: '16px'
                    }}
                  >
                    {item.portions} Порцій
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontFamily: 'Open Sans',
                      fontStyle: 'normal',
                      fontWweight: 400,
                      fontSize: '20px',
                      lineHeight: '16px'
                    }}>
                    <AccessTimeIcon /> {item.cookingTime}
                  </Typography>
                </Box>
              </Link>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center ' }}>
        <Button
          variant="text"
          endIcon={<ForwardIcon sx={{ rotate: '90deg', color: '#CB3C2E' }} />}
          onClick={handleAddRecipes}
          sx={{
            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWweight: 400,
            fontSize: '20px',
            lineHeight: '16px',
            textTransform: 'none',
            color: '#CB3C2E',
            marginBottom: '24px'
          }}
        >
          Показати ще
        </Button>
      </Box>
      <Pagination
        sx={{ display: 'flex', justifyContent: 'center', marginBottom: '80px' }}
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