import axios, { AxiosError } from 'axios';
import ShoppingCart from '../types/cartTypes';

const HostName = 'https://www.foodsparks.pp.ua'

export const getitemsCart = async (): Promise<ShoppingCart> => {
  try {
    const response = await axios.get<ShoppingCart>(`${HostName}/shopping-cart`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') || ''
      }
    });
    const cart = response.data;

    return cart;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch(error.response.status) {
          case 401:
            alert('Username or password is incorrect.');
            break;

          case 500:
            alert('Server can`t handle request');
            break;
            
          default:
            alert('Unexpected error');
        }
      } else {
        alert('Network error');
      }
    } else {
      alert('Unexpected error');
    }
    throw error;
  }
};

export const addItemCart = async (productId: number): Promise<ShoppingCart> => {
  try {
    const response = await axios.put(`${HostName}/shopping-cart/increase?productId=${productId}`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    })
    const cart = response.data;

    return cart;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch(error.response.status) {
          case 403:
            alert('Please log in to your personal account.');
            break;

          case 500:
            alert('Server can`t handle request');
            break;
            
          default:
            alert('Unexpected error');
        }
      } else {
        alert('Network error');
      }
    } else {
      alert('Unexpected error');
    }
    throw error;
  }
}

export const subtractItemCart = async (productId: number): Promise<ShoppingCart> => {
  try {
    const response = await axios.put(`${HostName}/shopping-cart/decrease?productId=${productId}`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    })
    const cart = response.data;

    return cart;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch(error.response.status) {
          case 403:
            alert('Please log in to your personal account.');
            break;

          case 500:
            alert('Server can`t handle request');
            break;
            
          default:
            alert('Unexpected error');
        }
      } else {
        alert('Network error');
      }
    } else {
      alert('Unexpected error');
    }
    throw error;
  }
}

export const removeItemCart = async (productId: number): Promise<ShoppingCart> => {
  try {
    const response = await axios.put(`${HostName}/shopping-cart/remove?productId=${productId}`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    })
    const cart = response.data;

    return cart;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch(error.response.status) {
          case 403:
            alert('Please log in to your personal account.');
            break;

          case 500:
            alert('Server can`t handle request');
            break;
            
          default:
            alert('Unexpected error');
        }
      } else {
        alert('Network error');
      }
    } else {
      alert('Unexpected error');
    }
    throw error;
  }
}

export const deleteAllItemsCart = async (): Promise<ShoppingCart> => {
  try {
    const response = await axios.put(`${HostName}/shopping-cart/clear`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    })
    const cart = response.data;

    return cart;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch(error.response.status) {
          case 403:
            alert('Please log in to your personal account.');
            break;

          case 500:
            alert('Server can`t handle request');
            break;
            
          default:
            alert('Unexpected error');
        }
      } else {
        alert('Network error');
      }
    } else {
      alert('Unexpected error');
    }
    throw error;
  }
}
