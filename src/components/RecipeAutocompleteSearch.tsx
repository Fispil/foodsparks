import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getRecipes } from '../api/fetchRecepies';
import Recipe from '../types/recipe';
import { theme } from '../theme';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const useStyles = makeStyles(({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#CB3C2E',
        borderRadius: '100px',
        height: '65px'
      },
    },
    '& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment': {
      top: 12
    },
    
    '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
      fontSize: '16px',
      color: 'black',
      backgroundColor: 'white',
      borderRadius: '60px',
      height: '25px',
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
      alighItems: 'center'
    }
  },
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

      setOptions(recipes.content);
    } catch (err) {
      throw new Error(`Can't get recipes from server: ${err}`)
    } finally {
      setIsLoading(false);
    };
  }

  const filterOptions = (options: Recipe[], { inputValue }: { inputValue: string }) => {
    if (inputValue) {
      return options.filter((option) => option.title.toLowerCase().startsWith(inputValue.toLowerCase()));
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
      sx={{
        minWidth: '500px',
        height: '55px',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.white,
        borderRadius: '50px'
      }}
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
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
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
              <img src={option.imageUrl} alt={option.title} style={{ height: 50, width: 50 }} />
              <Box>
                <Typography variant="body1">{option.title}</Typography>
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
        <TextField
          {...params}
          className={classes.root}
          placeholder="Search Recipe"
          variant='outlined'
          sx={{
            backgroundColor: theme.palette.common.white,
            borderRadius: '60px', 
            height: '60px',
            fontFamily: 'Open Sans',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
          }}
        />
      )}
    />
  );
}

export default RecipeAutocompleteSearch;