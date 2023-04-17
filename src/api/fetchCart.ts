import axios from 'axios';

const withAuthOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }
}

export const addItemCart = async (productId: number, quantity: number): Promise<string> => {
  try {
    const response = await axios.put(`https://www.foodsparks.pp.ua/shopping-cart/add?productId=${productId}&quantity=${quantity}`, null, withAuthOptions)
    const cart = response.data;

    return cart;
  } catch (error) {
    throw new Error(`Failed to login:${error}`);
  }
}