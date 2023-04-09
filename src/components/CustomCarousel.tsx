
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import Slider, { Settings } from "react-slick";
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';


import Recipe from "../types/recipe";
import { Theme } from "@emotion/react";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";

interface CarouselProps {
  items: Recipe[];
}

const useStyles = makeStyles((theme: Theme) => ({
  slideContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 465,
    gap: 32,
  },
  paper: {
    height: 325,
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselImageContainer: {
    height: 300,
    width: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    "& img": {
      height: "100%",
      objectFit: "cover",
      margin: "0 10px",
    },
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    color: 'black',
    "&:hover": {
      cursor: "pointer",
    },
  },
  itemTitle: {
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: '32px',
    lineHeight: '48px',
    color: '#fff'
  }
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
    lazyLoad: "ondemand",
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
          <Box
            sx={{
              height: 300,
              width: 320,
              marginRight: '32px',
              backgroundImage: `url(${item.imageUrl})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'contain',
              backgroundSize: 'cover'
            }}>

          </Box>
          <Typography variant="h5" className={classes.itemTitle}>{item.dishName}</Typography>
        </Box>
      ))}
    </Slider>
  );
};

export default CustomCarousel;