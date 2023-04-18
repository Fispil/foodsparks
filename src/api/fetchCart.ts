import axios from 'axios';

const withAuthOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }
}

const HostName = 'https://www.foodsparks.pp.ua'

export const getitemCart = async (authenticated: boolean ): Promise<string> => {
  try {
    const response = await axios.get(`${HostName}/shopping-cart?authenticated=${authenticated}`, withAuthOptions)
    const cart = response.data;

    return cart;
  } catch (error) {
    throw new Error(`Failed to login:${error}`);
  }
}

export const addItemCart = async (productId: number, quantity: number): Promise<string> => {
  try {
    const response = await axios.put(`${HostName}/shopping-cart/increase?productId=${productId}&quantity=${quantity}`, null, withAuthOptions)
    const cart = response.data;

    return cart;
  } catch (error) {
    throw new Error(`Failed to login:${error}`);
  }
}

export const subtractItemCart = async (productId: number, quantity: number): Promise<string> => {
  try {
    const response = await axios.put(`${HostName}/shopping-cart/deacrease?productId=${productId}&quantity=${quantity}`, null, withAuthOptions)
    const cart = response.data;

    return cart;
  } catch (error) {
    throw new Error(`Failed to login:${error}`);
  }
}

export const removeItemCart = async (productId: number): Promise<string> => {
  try {
    const response = await axios.put(`${HostName}/shopping-cart/remove?productId=${productId}`, null, withAuthOptions)
    const cart = response.data;

    return cart;
  } catch (error) {
    throw new Error(`Failed to login:${error}`);
  }
}