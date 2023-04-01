
import { Box, Paper, Theme, Typography } from "@mui/material";
import { useState } from "react";
import { makeStyles } from '@mui/styles';

import Carousel from "react-material-ui-carousel";
import Recipe from "../types/recipe";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    height: 400,
    width: "100%",
    backgroundColor: theme.palette.common.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselImageContainer: {
    height: 200,
  },
  carouselImage: {
    height: 200,
  }
}));

interface CarouselProps {
  items: Recipe[];
}

const CustomCarousel: React.FC<CarouselProps> = ({ items }) => {
  const classes = useStyles();
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const handleNext = () => {
    setActiveItemIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveItemIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <Carousel
      autoPlay={true}
      animation="slide"
      navButtonsAlwaysVisible
      //@ts-ignore
      activeItemIndex={activeItemIndex}
      onNext={handleNext}
      onPrev={handlePrev}
    >
      {items.map((item) => (
        <Box className={classes.paper} key={item.id}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box className={classes.carouselImageContainer}>
              <img src={item.imageUrl} className={classes.carouselImage} />
            </Box>
            <Typography variant="h6">{item.dishName}</Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;