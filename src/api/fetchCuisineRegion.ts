import axios from 'axios';
import CuisineRegion from '../types/cuisineRegions';

export const getCuisineRegion = async (): Promise<CuisineRegion[]> => {
  try {
    const response = await axios.get(`http://foodsparks.eu-central-1.elasticbeanstalk.com:80/cuisine-regions`);
    const recipe = response.data;

    return recipe;
  } catch (error) {
    throw new Error(`Failed to fetch recipe:${error}`);
  }
};