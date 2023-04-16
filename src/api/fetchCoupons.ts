import axios from 'axios';

export const sentCoupon = async (email: string): Promise<string> => {
  try {
    const response = await axios.put(`http://foodsparks.eu-central-1.elasticbeanstalk.com:80/coupons/new?userEmail=${email}`)
    const coupon = response.data;

    return coupon;
  } catch (error) {
    throw new Error(`Failed to login:${error}`);
  }
}