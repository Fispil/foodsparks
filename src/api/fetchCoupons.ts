import axios from 'axios';

const HostName = 'https://www.foodsparks.pp.ua'

export const sentCoupon = async (email: string): Promise<string> => {
  try {
    const response = await axios.put(`${HostName}/coupons/new?userEmail=${email}`)
    const coupon = response.data;

    return coupon;
  } catch (error) {
    throw new Error(`Failed to login:${error}`);
  }
}