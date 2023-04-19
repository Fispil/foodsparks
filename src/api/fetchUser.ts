import axios, { AxiosError } from 'axios';
import User from '../types/user';
import NewUser from '../types/userRegistration'


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

    return isLogin.token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch(error.response?.status) {
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