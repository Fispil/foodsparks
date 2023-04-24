import axios, { AxiosError } from 'axios';
import ErrorResponse from '../types/errorResponse';

const HostName = 'https://www.foodsparks.pp.ua'

export const sentCoupon = async (email: string): Promise<string | AxiosError<ErrorResponse>> => {
  try {
    const response = await axios.put(`${HostName}/coupons/new?userEmail=${email}`, null)
    const coupon = response.data;

    return coupon;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    
    return axiosError;
  }
}