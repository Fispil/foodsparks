import axios from 'axios';

export const sentCoupon = async (email: string): Promise<string> => {
  try {
    const response = await axios.put(`https://www.foodsparks.pp.ua/coupons/new?userEmail=${email}`)
    const coupon = response.data;

    return coupon;
  } catch (error) {
    throw new Error(`Failed to login:${error}`);
  }
}