
export interface User {
  login: string,
  password: string
}

export interface NewUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
}

export interface UserOrder {
  firstName: string;
  lastName: string;
  phone: string | null;
  town: string;
  street: string;
  build: string;
  apartment: number;
  comment: string;
  dayOfDelivery: string;
  timeOfDelivery: string;
}