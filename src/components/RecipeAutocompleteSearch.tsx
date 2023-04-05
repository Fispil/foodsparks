import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getRecipes } from '../api/fetchRecepies';
import Recipe from '../types/recipe';
import { theme } from '../theme';
import { Link } from 'react-router-dom';
import { Box, InputAdornment, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles((theme: Theme) => ({
  searchIcon: {
    position: "absolute",
    borderLeftColor: "3%"
  }
}));

const RecipeAutocompleteSearch: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const autocompleteRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  const loadRecipesFromServer = async () => {
    try {
      setIsLoading(true);

      const recipes = await getRecipes();

      setOptions(recipes);
    } catch (err) {
      throw new Error(`Can't get recipes from server: ${err}`)
    } finally {
      setIsLoading(false);
    };
  }

  const filterOptions = (options: Recipe[], { inputValue }: { inputValue: string }) => {
    if(inputValue) {
      return options.filter((option) => option.dishName.toLowerCase().startsWith(inputValue.toLowerCase()));
    }
    return {};
  };

  useEffect(() => {
    loadRecipesFromServer();
  }, []);
  
  useEffect(() => {
    if (autocompleteRef.current) { 
      autocompleteRef.current.blur();
    }
  }, [open]);

  return (
    <Autocomplete
      id="recipeSearch"
      sx={{ minWidth: '500px', color: theme.palette.common.white, backgroundColor: theme.palette.common.white }}
      ref={autocompleteRef}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      //@ts-ignore
      filterOptions={filterOptions}
      isOptionEqualToValue={(option, value) => option.dishName === value.dishName}
      getOptionLabel={(option) => option.dishName}
      options={options}
      loading={isLoading}
      renderOption={(props, option) => (
        <li {...props}>
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to={`/products/${option.id}`}
            rel="noopener noreferrer"
          >
            <Box sx={{ minWidth: '500px', display: 'flex', gap: '32px', alignItems: 'center' }}>
              <img src={option.imageUrl} alt={option.dishName} style={{ height: 50, width: 50 }} />
              <Box>
                <Typography variant="body1">{option.dishName}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <Typography variant="body2" color="text.secondary">
                    {option.portions} Порцій
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <AccessTimeIcon /> {option.cookingTime}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Link>
        </li>
      )}
      renderInput={(params) => (
        //@ts-ignore
        <TextField
          {...params}
          label={open ? null : <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><SearchIcon />Search Recipe</Typography>}
          sx={{ backgroundColor: theme.palette.common.white }}
        />
      )}
    />
  );
}

export default RecipeAutocompleteSearch;