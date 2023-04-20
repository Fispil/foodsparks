import axios from 'axios';
import RecipeResponse from '../types/recipeResponse';
import RecipeExtended from '../types/recipeExtended';

const HostName = 'https://www.foodsparks.pp.ua'

export const getRecipes = async (): Promise<RecipeResponse> => {
  try {
    const response = await axios.get(`${HostName}/recipes`);
    const recipe = response.data;

    return recipe;
  } catch (error) {
    throw new Error(`Failed to fetch recipe:${error}`);
  }
};

export const getByPageRecipes = async (page: number): Promise<RecipeResponse> => {
  try {
    const response = await axios.get(`${HostName}/recipes?page=${page - 1}&count=20`);
    const recipe = response.data;

    return recipe;
  } catch (error) {
    throw new Error(`Failed to fetch recipe:${error}`);
  }
};

export const getByPageAndFilterRecipes = async (
  page: number,
  cuisineRegionInId: number[] | null = null,
  dishTypeInId: number[] | null = null,
  complexityInId: number[] | null = null,
  spicedIn: boolean = false,
  productListInId: number[] | null = null,
  fieldname: string | null = null,
  order: string | null = null
): Promise<RecipeResponse> => {
  const arr = [cuisineRegionInId, dishTypeInId, complexityInId, spicedIn, productListInId, fieldname, order];
  const definedArr = arr.filter(item => item);
  const str = definedArr.map(item => {
    switch (item) {
      case cuisineRegionInId:
        if (item) {
          return `cuisineRegionIn=${item.join(',')}`
        }
        break;

      case dishTypeInId:
        if (item) {
          return `dishTypeIn=${item.join(',')}`
        }
        break;

      case complexityInId:
        if (item) {
          return `complexityIn=${item.join(',')}`
        }
        break;

      case spicedIn:
        return `spicedIn=${item}`

      case productListInId:
        if (item) {
          return `productListIn=${item.join(',')}`
        }
        break;

      case fieldname:
        return `fieldname=${item}`

      case order:
        return `sortBy=${item}`
    }
  })

  const result = str.join('&');

  try {
    const response = await axios
      .get(`${HostName}/recipes?page=${page - 1}&count=20&${result}`);
    const recipe = response.data;

    return recipe;
  } catch (error) {
    throw new Error(`Failed to fetch recipe:${error}`);
  }
};

export const getRecipeById = async (id: number): Promise<RecipeExtended> => {
  try {
    const response = await axios.get(`${HostName}/recipes/${id}`);
    const recipe = response.data;
    console.log(recipe)

    return recipe;
  } catch (error) {
    throw new Error(`Failed to fetch recipe:${error}`);
  }
};
