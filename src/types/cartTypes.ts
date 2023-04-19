type ProductAmount = {
  productId: number;
  name: string;
  quantity: number;
  productSum: number;
  quantityInPackages: string;
  imageUrl: string;
};

export default interface ShoppingCart {
  productAmount: ProductAmount[];
  userId: number | null;
  sum: number;
};