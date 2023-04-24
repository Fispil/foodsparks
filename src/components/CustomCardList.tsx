import * as React from 'react';
import Recipe from '../types/recipe';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PotIcon from '../assets/pot.svg';
import { Link } from 'react-router-dom';

interface Props {
  items: Recipe[];
}

const CustomCardList: React.FC<Props> = ({ items }) => {
  return (
    <ScrollContainer style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', WebkitOverflowScrolling: 'touch', msOverflowStyle: '-ms-autohiding-scrollbar' }}>
      {items.map((item) => (
        <Card key={item.id} sx={{ width: 300, flex: '0 0 auto', margin: '0 8px', position: 'relative' }}>
          <CardMedia
             sx={{
              height: 305,
              position: 'relative',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
            image={item.imageUrl}
            title={item.title}
          >
            <Box sx={{
              backgroundColor: '#fff',
              width: 'fit-content',
              position: 'absolute',
              top: '30px',
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
                  marginBottom: '16px',
                  '&:hover': {
                    color: '#CB3C2E',
                  },
                }}
              >
                {item.title}
              </Typography>
              <Box sx={{ position: 'absolute', bottom: '12px', width: 270 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '8px'
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
              </Box>
            </Link>
          </CardContent>
        </Card>
      ))
      }
    </ScrollContainer >
  );
};

export default CustomCardList;