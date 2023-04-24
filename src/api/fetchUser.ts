import axios, { AxiosError } from 'axios';
import { User, NewUser, UserOrder } from '../types/user';
import { UserAdress, UserInformation, UserAdressInformation } from '../types/userAdress';
import ErrorResponse from '../types/errorResponse';


const userOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const HostName = 'https://www.foodsparks.pp.ua'

export const loginUser = async (user: User): Promise<string | AxiosError<ErrorResponse>> => {
  try {
    const response = await axios.post(`${HostName}/login`, JSON.stringify(user), userOptions);
    const isLogin = response.data;

    localStorage.setItem('token', `Bearer ${isLogin.token}`);

    return isLogin.token;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError;
    } else {
      return 'An unexpected error occurred'
    }
  }
}

export const registerNewUser = async (user: NewUser): Promise<string | AxiosError<ErrorResponse>> => {
  try {
    const response = await axios.post(`${HostName}/register`, JSON.stringify(user), userOptions);
    const isRegistred = response.data;

    return isRegistred;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {

      return axiosError;
    } else {
      return 'An unexpected error occurred'
    }
  }
}

export const setAddressUser = async (userAddress: UserAdress) => {
  try {
    const response = await axios.put(`${HostName}/address/add`, userAddress, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    })
    const address = response.data;

    return address;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
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

export const adressByUser = async (): Promise<UserAdressInformation> => {
  try {
    const response = await axios.get(`${HostName}/address/by-user`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    })
    const address = response.data;

    return address;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
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

export const informationByUser = async (): Promise<UserInformation> => {
  try {
    const response = await axios.get(`${HostName}/user`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    })
    const information = response.data;

    return information;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
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

export const makeUserOrder = async (order: UserOrder): Promise<any> => {
  try {
    const response = await axios.post(`${HostName}/orders/complete`, JSON.stringify(order), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    })

    const information = response.data;

    return information;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
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