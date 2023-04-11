import axios from 'axios';

const withAuthOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }
}

export const addItemCart = async (productId: number, quantity: number): Promise<string> => {
  try {
    const response = await axios.put(`http://foodsparks.eu-central-1.elasticbeanstalk.com/shopping-cart/add?productId=${productId}&quantity=${quantity}`, null, withAuthOptions)
    const cart = response.data;

    return cart;
  } catch (error) {
    throw new Error(`Failed to login:${error}`);
  }
}