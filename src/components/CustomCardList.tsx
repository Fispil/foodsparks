import * as React from 'react';
import Recipe from '../types/recipe';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';

interface Props {
  items: Recipe[];
}

const CustomCardList: React.FC<Props> = ({ items }) => {
  return (
    <ScrollContainer style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', WebkitOverflowScrolling: 'touch', msOverflowStyle: '-ms-autohiding-scrollbar' }}>
      {items.map((item) => (
        <Card key={item.id} sx={{ width: 300, height: 440, flex: '0 0 auto', margin: '0 8px' }}>
          <CardMedia
            sx={{ height: 305, position: 'relative' }}
            image={item.imageUrl}
            title={item.title}
          >
            <Box sx={{ backgroundColor: '#CB3C2E', width: 'fit-content', position: 'absolute', top: '30px' }}>
              <Typography gutterBottom variant="h5" sx={{ margin: '8px 16px' }}>
                Легкий
              </Typography>
            </Box>
          </CardMedia>
          <CardContent sx={{ marginTop: '24px' }}>
            <Link to={`/products/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <Typography
                gutterBottom
                variant="h6"
                sx={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWweight: 400,
                  fontSize: '30px',
                  lineHeight: '25px',
                  marginBottom: '16px'
                }}
              >
                {item.title}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: 'Open Sans',
                    fontStyle: 'normal',
                    fontWweight: 400,
                    fontSize: '20px',
                    lineHeight: '16px'
                  }}
                >
                  {item.portions} Порцій
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'Open Sans',
                    fontStyle: 'normal',
                    fontWweight: 400,
                    fontSize: '20px',
                    lineHeight: '16px'
                  }}>
                  <AccessTimeIcon /> {item.cookingTime}
                </Typography>
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