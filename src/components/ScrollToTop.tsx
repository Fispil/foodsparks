import React, { useState, useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { animateScroll as scroll } from 'react-scroll';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { theme } from '../theme';


const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <Tooltip title="Scroll to top">
          <IconButton
            sx={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              zIndex: 1000,
              backgroundColor: '#000',
              [theme.breakpoints.up('sm')]: {
                display: 'none',
              },
            }}
            onClick={scrollToTop}>
            <ArrowUpwardIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default ScrollToTop;