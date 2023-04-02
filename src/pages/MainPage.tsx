import { useEffect, useState } from 'react';
import { Box, Button, Container, Divider, Grid, Skeleton, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { getRecipes } from '../api/fetchRecepies';
import Recipe from '../types/recipe';
import CustomCarousel from '../components/CustomCarousel';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import { theme } from '../theme';
import CustomCardList from '../components/CustomCardList';

const useStyles = makeStyles((theme: Theme) => ({
  carouselConainer: {
    backgroundColor: "grey"
  }
}));

const MainPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const topCatergories = ['Основна страва', 'Перші страви', 'Закуска' , 'Десерт', 'Випічка'];

  const loadRecepiesFromServer = async () => {
    try {
      setIsLoading(true);
      const recipesFromServer = await getRecipes();

      setRecipes(recipesFromServer);
    } catch (err) {
      throw new Error(`Cant get recipes from server: ${err}`)
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
      <Box className={classes.carouselConainer} sx={{ maxWidth: '100%', boxSizing: 'border-box' }}>
        <Container maxWidth="xl">
          <Typography variant='h4'>Підбірки української кухні</Typography>
          <CustomCarousel items={recipes.slice(0, 4)} />
        </Container>
      </Box>
      <Box>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
            <Typography variant='h4'>Рецепти української кухні</Typography>
            <Button
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}
              sx={{
                border: `1px solid ${theme.palette.primary.dark}`,
                borderRadius: '5px',
                backgroundColor: 'rgb(176,224,230)',
                color: 'black'
              }}>
              <Link to="/products" style={{ textDecoration: 'none' }}>Всі рецепти</Link>
            </Button>
          </Box>
          <Divider sx={{ backgroundColor: 'grey' }}/>
          {topCatergories.map(category => (
            <Box key={category}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                  <Typography variant='h4'>{category}</Typography>
                  <Link to="/products" style={{ textDecoration: 'none' }}>Показати всі</Link>
                </Box>
                <CustomCardList items={recipes.filter(item => item.dishType === category)} />
              </Box>
              <Divider sx={{ backgroundColor: 'black' }}/>
            </Box>
          ))}
        </Container>
      </Box>
    </>
  );
}

export default MainPage;