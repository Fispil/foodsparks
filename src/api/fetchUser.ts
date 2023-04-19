import axios, { AxiosError } from 'axios';
import User from '../types/user';
import NewUser from '../types/userRegistration'
import { UserAdress, UserInformation, UserAdressInformation } from '../types/userAdress';


const userOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const HostName = 'https://www.foodsparks.pp.ua'

export const loginUser = async (user: User): Promise<string> => {
  try {
    const response = await axios.post(`${HostName}/login`, JSON.stringify(user), userOptions);
    const isLogin = response.data;

    localStorage.setItem('token', `Bearer ${isLogin.token}`);

    return isLogin.token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch(error.response?.data) {
        case 401:
          alert('Username or password is incorrect.');
          break;

        case 500:
          alert('Server can`t handle request');
          break;
      }
      return error.message;
    } else {
      alert('Unexpected error');
      return 'An unexpected error occurred';
    }
  } 
}

export const registerNewUser = async (user: NewUser) => {
  try {
    const response = await axios.post(`${HostName}/register`, JSON.stringify(user), userOptions);
    const isRegistred = response.data;
    console.log(isRegistred);

    return isRegistred;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return error.message;
    } else {
      alert('Unexpected error');
      return 'An unexpected error occurred';
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

export const adressByUser = async (): Promise<UserAdressInformation>  => {
  try {
    const response = await axios.get(`${HostName}/address/by-user`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    })
    const address = response.data;
    console.log(address);

    return address;
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

export const informationByUser = async (): Promise<UserInformation>  => {
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