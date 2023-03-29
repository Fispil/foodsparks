import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Popover,
  Typography,
} from '@mui/material';
import { theme } from '../theme';
import { Link } from 'react-router-dom';
import SignInDialog from './SignInDialog';
import SignUpDialog from './SignUpDialog';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import AppBarSearch from './AppBarSearch';

const Header: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isConctactOpen = Boolean(anchorEl);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ maxWidth: '100%' }}>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', flexShrink: 1 }} >
          <Box>
            <img src="" ></img>
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 2,
            justifyContent: 'space-between',
            gap: '32px'
          }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 2,
                justifyContent: 'space-between',
                gap: '32px'
              }}
            >
              <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                Phone
              </Typography>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={isConctactOpen}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ width: '250px', textAlign: 'center' }}>Phone</Typography>
              </Popover>
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
                  <SignInDialog />
                </Box>

                <Box
                  sx={{
                    border: `1px solid ${theme.palette.primary.dark}`,
                    borderRadius: '5px',
                    backgroundColor: 'rgb(220,20,60)',
                    color: 'black'
                  }}
                >
                  <SignUpDialog />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Toolbar>
      <AppBarSearch />
    </AppBar>
  );
};

export default Header;