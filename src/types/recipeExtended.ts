interface Product {
  productId: number;
  name: string;
  amount: string;
  price: number;
}

export default interface RecipeExtended {
  id: number;
  title: string;
  subtitle: string;
  cuisineRegion: string;
  dishType: string;
  productsList: Product[];
  spiced: boolean;
  instructions: string[];
  cookingTime: string;
  portions: number;
  imageUrl: string;
  complexity: string;
}
