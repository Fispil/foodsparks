import axios from 'axios';
import CuisineRegion from '../types/cuisineRegions';
import DishType from '../types/dishTypes';
import ComplexityType from '../types/complexityTypes';

const HostName = 'https://www.foodsparks.pp.ua'

export const getCuisineRegion = async (): Promise<CuisineRegion[]> => {
  try {
    const response = await axios.get(`${HostName}/cuisine-regions`);
    const cuisineRegion = response.data;

    return cuisineRegion;
  } catch (error) {
    throw new Error(`Failed to fetch recipe:${error}`);
  }
};

export const getDishTypes = async (): Promise<DishType[]> => {
  try {
    const response = await axios.get(`${HostName}/dish-types`);
    const dishTypes = response.data;

    return dishTypes;
  } catch (error) {
    throw new Error(`Failed to fetch recipe:${error}`);
  }
};

export const getComplexityTypes = async (): Promise<ComplexityType[]> => {
  try {
    const response = await axios.get(`${HostName}/complexities`);
    const complexityTypes = response.data;

    return complexityTypes;
  } catch (error) {
    throw new Error(`Failed to fetch recipe:${error}`);
  }
};