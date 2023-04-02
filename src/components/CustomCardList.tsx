import * as React from 'react';
import Recipe from '../types/recipe';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Props {
  items: Recipe[];
}

const CustomCardList: React.FC<Props> = ({ items }) => {
  return (
    <ScrollContainer style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', WebkitOverflowScrolling: 'touch', msOverflowStyle: '-ms-autohiding-scrollbar' }}>
      {items.map((item) => (
        <Card key={item.id} sx={{ width: 305, height: 320, flex: '0 0 auto', margin: '0 8px' }}>
          <CardMedia
            sx={{ height: 140 }}
            image={item.imageUrl}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.dishName}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {item.portions} Порцій
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <AccessTimeIcon /> {item.cookingTime}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small">Add to cart</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </ScrollContainer>
  );
};

export default CustomCardList;