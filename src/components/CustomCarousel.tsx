import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import Slider, { Settings } from "react-slick";
import { makeStyles } from "@mui/styles";
import { Box, IconButton, Typography } from "@mui/material";
import CuisineRegion from "../types/cuisineRegions";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface CarouselProps {
  items: CuisineRegion[];
}

const useStyles = makeStyles(({
  slideContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 465,
    gap: 32,
  },
  carouselImageContainer: {
    height: 300,
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
  itemTitle: {
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: '32px',
    lineHeight: '48px',
    color: '#fff',
    '&:hover': {
      color: '#CB3C2E',
    },
  },
}));

interface ArrowProps {
  activeItemIndex: number;
  setActiveItemIndex: React.Dispatch<React.SetStateAction<number>>;
}

const PrevArrow: React.FC<ArrowProps> = ({ activeItemIndex, setActiveItemIndex }) => {
  const handleClick = () => {
    setActiveItemIndex((activeItemIndex) => activeItemIndex - 1);
  };

  return (
    <Box sx={{ backgroundColor: '#CB3C2E', borderRadius: '50%' }}>
      <IconButton onClick={handleClick}>
        <ArrowBackIosNewIcon />
      </IconButton>
    </Box>
  );
};

const NextArrow: React.FC<ArrowProps> = ({ activeItemIndex, setActiveItemIndex }) => {
  const handleClick = () => {
    setActiveItemIndex((activeItemIndex) => activeItemIndex + 1);
  };

  return (
    <Box sx={{ backgroundColor: '#CB3C2E', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <IconButton onClick={handleClick}>
        <ArrowForwardIosIcon color="action" />
      </IconButton>
    </Box>
  );
};

const CustomCarousel: React.FC<CarouselProps> = ({ items }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const classes = useStyles();

  const settings: Settings = {
    arrows: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "10px",
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    afterChange: (index: number) => setActiveItemIndex(index),
    lazyLoad: "ondemand",
    prevArrow: <PrevArrow activeItemIndex={activeItemIndex} setActiveItemIndex={setActiveItemIndex} />,
    nextArrow: <NextArrow activeItemIndex={activeItemIndex} setActiveItemIndex={setActiveItemIndex} />,
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
        <Box key={item.id} style={{ margin: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '292px' }}>
          <Box
            sx={{
              height: 290,
              width: 290,
              backgroundImage: `url(${item.imageUrl})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'contain',
              backgroundSize: 'cover',
              marginBottom: '32px',
            }}>
          </Box>
          <Link to={`/products?linkcuisineRegionIn=${item.id}`} style={{ textDecoration: 'none' }} >
            <Typography variant="subtitle1" className={classes.itemTitle}>{item.cuisineRegionName}</Typography>
          </Link>
        </Box>
      ))}
    </Slider>
  );
};

export default CustomCarousel;