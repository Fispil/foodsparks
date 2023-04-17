import axios from 'axios';
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

    localStorage.setItem('token', `Bearer ${isLogin.token}`);

    return isLogin;
  } catch (error) {
    throw new Error(`Failed to login:${error}`);
  }
}

export const registerNewUser = async (user: NewUser) => {
  try {
    const response = await axios.post(`${HostName}/register`, JSON.stringify(user), userOptions);
    const isRegistred = response.data;
    console.log(isRegistred);

    return isRegistred;
  } catch (error) {
    throw new Error(`Failed to login:${error}`);
  }
} 