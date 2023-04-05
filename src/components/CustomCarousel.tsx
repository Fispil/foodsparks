
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import Slider, { LazyLoadTypes, Settings } from "react-slick";


import Recipe from "../types/recipe";
import { Theme } from "@emotion/react";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";

interface CarouselProps {
  items: Recipe[];
}

const useStyles = makeStyles((theme: Theme) => ({
  slideContainer: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, gap: '32px'
  },
  paper: {
    height: 325,
    width: "100%",
    backgroundColor: 'white',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselImageContainer: {
    height: 300,
    width: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    '& img': {
      height: '100%',
      objectFit: 'cover',
      margin: '0 10px',
    },
  },
}));

const CustomCarousel: React.FC<CarouselProps> = ({ items }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const classes = useStyles();

  const settings: Settings = {
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "10px",
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    afterChange: (index: number) => setActiveItemIndex(index),
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
        },
      },
    ],
  };

  return (
    <Slider {...settings} initialSlide={activeItemIndex} className={classes.slideContainer}>
      {items.map((item) => (
        <Box key={item.id} style={{ margin: '20px' }}>
          <img src={item.imageUrl} alt={item.dishName} className={classes.carouselImageContainer} />
          <Typography variant="h5">{item.dishName}</Typography>
        </Box>
      ))}
    </Slider>
  );
};

export default CustomCarousel;