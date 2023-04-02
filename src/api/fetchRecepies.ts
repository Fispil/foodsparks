import axios from 'axios';
import Recipe from '../types/recipe';

export const getRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await axios.get('http://foodsparks.eu-central-1.elasticbeanstalk.com:80/recipes');
    const recipe = response.data;

    console.log(response.data);

    return recipe;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch recipe:${error}`);
  }
};

export const getByPageRecipes = async (page: number): Promise<Recipe[]> => {
  try {
    const response = await axios.get(`http://foodsparks.eu-central-1.elasticbeanstalk.com/recipes?page=${page - 1}&count=20`);
    const recipe = response.data;

    return recipe;
  } catch (error) {
    throw new Error(`Failed to fetch recipe:${error}`);
  }
};

export const getRecipeById = async (id: number): Promise<Recipe> => {
  try {
    const response = await axios.get(`http://foodsparks.eu-central-1.elasticbeanstalk.com/recipes/${id}`);
    const recipe = response.data;

    return recipe;
  } catch (error) {
    throw new Error(`Failed to fetch recipe:${error}`);
  }
};
