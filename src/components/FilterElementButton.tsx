import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import CuisineRegion from '../types/cuisineRegions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DishType from '../types/dishTypes';
import ComplexityType from '../types/complexityTypes';
import LeftArrowIcon from '../assets/arrowleft.svg';
import FilterIcon from '../assets/icons_filter.svg';

interface Props {
  cuisineRegionNames: CuisineRegion[],
  cuisineRegionInId: number[] | null,
  setCuisineRegionInId: (cuisineRegionInId: number[] | null) => void,
  dishTypes: DishType[],
  dishTypeInId: number[] | null,
  setDishTypeInId: (dishTypeInId: number[] | null) => void,
  complexityTypes: ComplexityType[],
  complexityInId: number[] | null,
  setComplexityInId: (complexityInId: number[] | null) => void,
  spicedIn: boolean,
  setSpicedIn: (spicedIn: boolean) => void,
  totalItems: number
}

const useStyles = makeStyles(({
  root: {
    display: 'flex'
  },
  drawer: {
    width: '550px',
    flexShrink: 0
  },
  drawerPaper: {
    width: '550px'
  },
  content: {
    flexGrow: 1,
    padding: '32px'
  },
  labelContent: {
    color: '#CB3C2E'
  }
})
);

const FilterElementButton: React.FC<Props> = ({
  cuisineRegionNames,
  cuisineRegionInId,
  setCuisineRegionInId,
  dishTypes,
  dishTypeInId,
  setDishTypeInId,
  complexityTypes,
  complexityInId,
  setComplexityInId,
  spicedIn,
  setSpicedIn,
  totalItems
}) => {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handlePropertyChange = (propertyId: number, propertyToHandle: number[] | null, functionToHandle: (propertyToHandle: number[] | null) => void) => {
    if (propertyToHandle == null) {
      functionToHandle([propertyId])
    } else if (propertyToHandle.includes(propertyId)) {
      functionToHandle(propertyToHandle.filter((id) => id !== propertyId));

      if (propertyToHandle && propertyToHandle.length === 0) {
        functionToHandle(null);
      }
    } else {
      functionToHandle([...propertyToHandle, propertyId]);

      if (propertyToHandle && propertyToHandle.length === 0) {
        functionToHandle(null);
      }
    }
  }

  const handleReset = () => {
    setCuisineRegionInId(null);
    setDishTypeInId(null);
    setComplexityInId(null);
    setSpicedIn(false);
    setIsDrawerOpen(false);
  }

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box className={classes.root}>
      <Button
        variant='outlined'
        sx={{
          border: '1px solid #CB3C2E',
          textTransform: 'none', color: '#CB3C2E',
          fontFamily: 'Open Sans',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '24px',
          lineHeight: '16px',
          padding: '12px 24px'
        }}
        endIcon={<img src={FilterIcon} alt='FilterIcon' />}
        onClick={handleDrawerOpen}
      >
        <Typography variant='body1'>Фільтри</Typography>
      </Button>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        classes={{
          paper: classes.drawerPaper
        }}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <Box sx={{ p: 2 }}>
          <Button
            variant='text'
            startIcon={<img src={LeftArrowIcon} alt='ArrowIcon' />}
            onClick={handleDrawerClose}
            sx={{ marginBottom: '40px', textTransform: 'none' }}
          >
            <Typography variant='body1'>Назад</Typography>
          </Button>
          <Typography variant='body1' sx={{ textAlign: 'center', marginBottom: '32px' }}>
            Фільтри
          </Typography>
          <Accordion sx={{ marginBottom: '32px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body1" sx={{ padding: '24px' }}>Тип страви</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {dishTypes.map(property => (
                  <FormControlLabel
                    key={property.id}
                    control={
                      <Checkbox
                        checked={dishTypeInId != null && dishTypeInId.includes(property.id)}
                        onChange={() => handlePropertyChange(property.id, dishTypeInId, setDishTypeInId)} />
                    }
                    label={<Typography variant="body1" className={dishTypeInId && dishTypeInId.includes(property.id) ? 'labelContent' : ''}>{property.dishTypeName}</Typography>}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ marginBottom: '32px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body1" sx={{ padding: '24px' }}>Регіон</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cuisineRegionNames.map(property => (
                  <FormControlLabel
                    key={property.id}
                    control={
                      <Checkbox checked={cuisineRegionInId !== null && cuisineRegionInId.includes(property.id)}
                        onChange={() => handlePropertyChange(property.id, cuisineRegionInId, setCuisineRegionInId)} />}
                    label={property.cuisineRegionName}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ marginBottom: '32px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body1" sx={{ padding: '24px' }}>Ступінь складності</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {complexityTypes.map(property => (
                  <FormControlLabel
                    key={property.id}
                    control={
                      <Checkbox checked={complexityInId !== null && complexityInId.includes(property.id)}
                        onChange={() => handlePropertyChange(property.id, complexityInId, setComplexityInId)} />}
                    label={property.complexityName}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ marginBottom: '56px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body1" sx={{ padding: '24px' }}>Гострі страви</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <FormControlLabel
                  control={<Checkbox
                    checked={spicedIn}
                    onChange={() => setSpicedIn(!spicedIn)} />
                  }
                  label="Гострі страви"
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          <Box sx={{ padding: '16px 24px' }} >
            <Box>
              <Typography variant="body1" textAlign="center" sx={{ fontWeight: 600, marginBottom: '24px' }}>Знайдено рецептів: {totalItems}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
              <Button variant='outlined' sx={{ textTransform: 'none', borderRadius: '12px' }} onClick={handleReset}>
                <Typography variant="body1" sx={{ padding: '24px 46px' }}>Скинути</Typography>
              </Button>
              <Button variant='contained' sx={{ textTransform: 'none', borderRadius: '12px' }} onClick={handleDrawerClose}>
                <Typography variant="body1" sx={{ padding: '24px 46px' }}>Застосувати</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}


export default FilterElementButton;