import React, { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  InputBase,
  Paper,
  ListItem,
  ListItemText,
  Modal,
  Button,
  Box,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { getSearchedRecipes } from '../api/fetchRecepies';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Recipe from '../types/recipe';
import PotIcon from '../assets/pot.svg';
import SearchIconCustom from '../assets/search.svg';


const SearchInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.common.white,
    borderRadius: 4,
  },
  '& .MuiInputBase-root.Mui-focused': {
    backgroundColor: theme.palette.common.white,
  },
  '& .MuiInputAdornment-root': {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    color: theme.palette.text.secondary,
  },
}));

const CustomSearchBar: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [results, setResults] = useState<Recipe[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    loadRecipesFromServer();
  }, [value])

  const loadRecipesFromServer = async () => {
    if (value === '') {
      setResults([]);
    } else {
      const recipesFromServer = await getSearchedRecipes(value);

      setResults(recipesFromServer);
      setShowResults(true);
    }
  }

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleModalClose = () => {
    setShowResults(false);
  };

  return (
    <>
      <Button onClick={() => setShowResults(true)}>
        <img src={SearchIconCustom} alt='coockedmeal' />
      </Button>
      <Modal open={showResults} onClose={handleModalClose}>
        <Paper
          sx={{
            position: 'absolute',
            top: '2%',
            left: '30%',
            width: 600,
            maxHeight: '70vh',
            overflowY: 'auto',
            borderRadius: 4,
            boxShadow: 24,
          }}
          ref={searchRef}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #000000',
              borderRadius: '12px',
              position: 'relative',
            }}
          >
            <SearchIcon fontSize='large' sx={{ position: 'absolute', left: 20, top: '25%' }} />
            <SearchInput
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              value={value}
              onChange={handleSearch}
            />
          </Box>
          {value.length === 0 && (
            <ListItem>
              <ListItemText primary="No results found" />
            </ListItem>
          )}
          {value.length > 0 && results.length === 0 && (
            <ListItem>
              <ListItemText primary="No results found" />
            </ListItem>
          )}
          {results.map((option) => (
            <ListItem>
              <Button
                key={option.id}
                onClick={handleModalClose}
                sx={{ textTransform: 'none' }}
              >
                <Link
                  style={{ textDecoration: 'none', color: 'black' }}
                  to={`/products/${option.id}`}
                  rel="noopener noreferrer"
                >
                  <Box sx={{ minWidth: '500px', display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <img src={option.imageUrl} alt={option.title} style={{ height: 50, width: 50 }} />
                    <Box>
                      <Typography variant="body1" textAlign='start' sx={{ marginBottom: '8px' }}>{option.title}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                        <Typography variant="body2" color="text.secondary">
                          <img src={PotIcon} alt="Pot" style={{ marginRight: '8px' }} />{option.portions} Порцій
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <AccessTimeIcon /> {option.cookingTime}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </Button>
            </ListItem>
          ))}
        </Paper>
      </Modal >
    </>
  );
};

export default CustomSearchBar;