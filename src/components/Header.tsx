import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Box,
} from '@mui/material';
import { theme } from '../theme';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexShrink: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 2,
              justifyContent: 'space-between',
              gap: '32px'
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontSize: '20px'
              }}
            >
              Home
            </Link>
            <Link
              to="/about"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontSize: '20px'
              }}
            >
              About
            </Link>
            <Link
              to="/products"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontSize: '20px'
              }}
            >
              Products
            </Link>
          </Box>
          <Box
            mr={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 2
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box
                  sx={{
                    border: `1px solid ${theme.palette.primary.dark}`,
                    borderRadius: '5px',
                    backgroundColor: 'rgb(176,224,230)',
                    color: 'black'
                  }}
                >
                  <Button component="a" href="#/signin" color="inherit">
                    Sign In
                  </Button>
                </Box>

                <Box
                  sx={{
                    border: `1px solid ${theme.palette.primary.dark}`,
                    borderRadius: '5px',
                    backgroundColor: 'rgb(220,20,60)',
                    color: 'black'
                  }}
                >
                  <Button component="a" href="#/signup" color="inherit">
                    Sign Up
                  </Button>
                </Box>
              </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;