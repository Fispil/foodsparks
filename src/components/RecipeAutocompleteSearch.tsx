import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { getRecipes } from '../api/fetchRecepies';
import Recipe from '../types/recipe';
import { theme } from '../theme';

const RecipeAutocompleteSearch: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadRecepiesFromServer = async () => {
    try {
      setIsLoading(true);
      const recipes = await getRecipes();

      setOptions(recipes);
    } catch (err) {
      throw new Error(`Cant get recipes from server: ${err}`)
    } finally {
      setIsLoading(false);
    };
  }

  useEffect(() => {
    loadRecepiesFromServer();
  }, [open]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="recipeSearch"
      sx={{ minWidth: '300px', color: theme.palette.common.white, backgroundColor: theme.palette.common.white }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.dishName === value.dishName}
      getOptionLabel={(option) => option.dishName}
      options={options}
      loading={isLoading}
      renderInput={(params) => (
        // @ts-ignore
        <TextField {...params} label="Search Recipe" sx={{ backgroundColor: theme.palette.common.white }} />
      )}
    />
  );
}

export default RecipeAutocompleteSearch;