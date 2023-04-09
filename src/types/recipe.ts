export default interface Recipe {
  id: number;
  dishName: string;
  imageUrl: string;
  cookingTime: string;
  portions: string;
  dishType: string;
}


export type IngredientListItem = { name: 'string', amount: number};

export default interface RecipeExtended {
  id: number;
  dishName: string;
  cuisineRegion: string;
  dishType: string;
  productsList: IngredientListItem[];
  spiced: boolean;
  instructions: string[];
  cookingTime: string;
  portions: string;
  imageUrl: string;
}