import { Container, Typography, Box, Button, Card, CardContent, CardMedia, Pagination } from '@mui/material';
import Breadcrumb from '../components/BreadCrums';
import { useEffect, useState } from 'react';
import { getByPageAndFilterRecipes, getByPageRecipes } from '../api/fetchRecepies';
import Recipe from '../types/recipe';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';
import SortElementButton from '../components/SortElementButton';
import FilterElementButton from '../components/FilterElementButton';
import CuisineRegion from '../types/cuisineRegions';
import { getComplexityTypes, getCuisineRegion, getDishTypes } from '../api/fetchTypes';
import DishType from '../types/dishTypes';
import ComplexityType from '../types/complexityTypes';
import PotIcon from '../assets/pot.svg';
import ArrowDownIcon from '../assets/arrowdown.svg';


const ProductsPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cuisineRegions, setCuisineRegions] = useState<CuisineRegion[]>([])
  const [cuisineRegionInId, setCuisineRegionInId] = useState<number[] | null>(null);
  const [dishTypes, setDishtypes] = useState<DishType[]>([])
  const [dishTypeInId, setDishTypeInId] = useState<number[] | null>(null);
  const [complexityTypes, setComplexityTypes] = useState<ComplexityType[]>([])
  const [complexityInId, setComplexityInId] = useState<number[] | null>(null);
  const [spicedIn, setSpicedIn] = useState(false);
  const [productListInId, setProductListInId] = useState<number[] | null>(null);
  const [fieldname, setFieldname] = useState('');
  const [order, setOrder] = useState('');
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);


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
      setRecipes(currentRecipes => [...currentRecipes, recipesFromServer.content].flat());
    } catch (err) {
      throw new Error(`Cant get recipes from server: ${err}`)
    } finally {
      setIsLoading(false);
    };
  }

  const filterOptionsClear = () => {
    if (cuisineRegionInId && cuisineRegionInId.length === 0) {
      setCuisineRegionInId(null);
    }

    if (dishTypeInId && dishTypeInId.length === 0) {
      setDishTypeInId(null);
    }

    if (complexityInId && complexityInId.length === 0) {
      setComplexityInId(null);
    }
  }

  const loadRecepiesFromServer = async () => {
    try {
      setIsLoading(true);
      filterOptionsClear();

      const [recipesFromServer,] = await Promise.all([
        getByPageAndFilterRecipes(page, cuisineRegionInId, dishTypeInId, complexityInId, spicedIn, productListInId, fieldname, order),
      ]);

      setRecipes(recipesFromServer.content);
      setMaxPages(recipesFromServer.totalPages);
      setTotalItems(recipesFromServer.totalElements);
    } catch (err) {
      throw new Error(`Cant get recipes from server: ${err}`)
    } finally {
      setIsLoading(false);
    };
  }

  const loadTypesFromServer = async () => {
    try {
      setIsLoading(true);
      const [dishTypesFromServer, cuisineRegionFromServer, complexityTypesFromServer] = await Promise.all([
        getDishTypes(),
        getCuisineRegion(),
        getComplexityTypes(),
      ])

      setDishtypes(dishTypesFromServer);
      setCuisineRegions(cuisineRegionFromServer);
      setComplexityTypes(complexityTypesFromServer);
    } catch (err) {
      throw new Error(`Cant get recipes from server: ${err}`)
    } finally {
      setIsLoading(false);
    };
  }

  useEffect(() => {
    loadTypesFromServer();
    console.log('loaded');
  }, [])

  useEffect(() => {
    loadRecepiesFromServer();
  }, [page, order, cuisineRegionInId, dishTypeInId, spicedIn, complexityInId]);

  return (
    <Container maxWidth="xl">
      <Breadcrumb />
      <Typography
        variant="h5"
        sx={{
          marginBottom: '32px',
          fontWeight: 700,
        }}
      >
        Рецепти української кухні
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <FilterElementButton
          cuisineRegionNames={cuisineRegions}
          cuisineRegionInId={cuisineRegionInId}
          setCuisineRegionInId={setCuisineRegionInId}
          dishTypes={dishTypes}
          dishTypeInId={dishTypeInId}
          setDishTypeInId={setDishTypeInId}
          complexityInId={complexityInId}
          complexityTypes={complexityTypes}
          setComplexityInId={setComplexityInId}
          spicedIn={spicedIn}
          setSpicedIn={setSpicedIn}
          totalItems={totalItems}
        />
        <SortElementButton order={order} onOrderChange={setOrder} />
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', marginBottom: '40px' }}>
        {recipes.map((item) => (
          <Card key={item.id} sx={{ width: 300, height: 500, flex: '0 0 auto', margin: '0 8px' }}>
            <CardMedia
              sx={{ height: 305, position: 'relative' }}
              image={item.imageUrl}
              title={item.title}
            >
              <Box sx={{
                backgroundColor: '#fff',
                width: 'fit-content',
                position: 'absolute',
                top: '30px',
                '&:hover': {
                  backgroundColor: '#CB3C2E',
                },
              }}>
                <Typography variant="body2" sx={{ padding: '8px 16px' }}>
                  Легкий
                </Typography>
              </Box>
            </CardMedia>
            <CardContent>
              <Link to={`/products/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    marginBottom: '16px'
                  }}
                >
                  {item.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img src={PotIcon} alt="Pot" style={{ marginRight: '8px' }} />{item.portions} Порцій
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
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
          endIcon={<img src={ArrowDownIcon} alt="arrowdown" />}
          onClick={handleAddRecipes}
          sx={{
            textTransform: 'none',
            color: '#CB3C2E',
            marginBottom: '24px'
          }}
        >
          <Typography variant='body1'>
            Показати ще
          </Typography>
        </Button>
      </Box>
      <Pagination
        sx={{ display: 'flex', justifyContent: 'center', marginBottom: '80px' }}
        color='primary'
        size='large'
        variant="outlined"
        shape="rounded"
        count={maxPages}
        page={page}
        onChange={handlePageChange}
        hidePrevButton
        hideNextButton
      />
    </Container>
  );
}

export default ProductsPage;