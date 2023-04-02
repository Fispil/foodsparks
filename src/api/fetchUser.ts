import axios from 'axios';
import User from '../types/user';

export const getUserByLogin = async (user: User): Promise<User> => {
  try {
    const response = await axios.post('http://foodsparks.eu-central-1.elasticbeanstalk.com:80/login', { user });
    const isLogin = response.data;

    return isLogin;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to login:${error}`);
  }
}

export const registerNewUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.post('http://foodsparks.eu-central-1.elasticbeanstalk.com:80/register', { user });
    const isRegistred = response.data;

    return isRegistred;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to login:${error}`);
  }
}