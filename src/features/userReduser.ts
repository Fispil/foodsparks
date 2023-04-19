import { getitemsCart } from "../api/fetchCart";
import ShoppingCart from "../types/cartTypes";
import { UserAdressInformation, UserInformation } from "../types/userAdress";

type SetIsLogginedAction = {
  type: 'user/SET_IsLoggined';
  payload: boolean;
};

type SetUserShoppingCartAction = {
  type: 'user/SET_UserShoppingCart';
  payload: ShoppingCart;
};

type SetUserInformationAction = {
  type: 'user/SET_UserInformation';
  payload: UserInformation;
};

type SetUserAddress = {
  type: 'user/SET_UserAddress';
  payload: UserAdressInformation;
};

const setIsLoggined = (isLoggined: boolean): SetIsLogginedAction => ({
  type: 'user/SET_IsLoggined',
  payload: isLoggined
});

const setShoppingCart = (shoppingCart: ShoppingCart): SetUserShoppingCartAction => ({
  type: 'user/SET_UserShoppingCart',
  payload: shoppingCart
});

const setUserInformation = (user: UserInformation): SetUserInformationAction => ({
  type: 'user/SET_UserInformation',
  payload: user
});

const setUserAddress = (userAddress: UserAdressInformation): SetUserAddress => ({
  type: 'user/SET_UserAddress',
  payload: userAddress
});

type Action = SetIsLogginedAction | SetUserShoppingCartAction | SetUserInformationAction | SetUserAddress;

export const actions = { setIsLoggined, setShoppingCart, setUserInformation, setUserAddress };

type State = {
  userShoppingCart: ShoppingCart;
  isLoggined: boolean;
  userInformation: UserInformation;
  userAddress: UserAdressInformation
};

const defaultState: State = {
  isLoggined: false,
  userShoppingCart: {
    productAmount: [],
    userId: null,
    sum: 0
  },
  userInformation: {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    emailConfirmed: false,
    phone: '',
    birthdate: null,
    genderId: null,
    roleId: [],
  },
  userAddress: {
    id: 0,
    town: '',
    street: '',
    build: '',
    apartment: 0,
    userId: 0
  }
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const userReducer = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case 'user/SET_IsLoggined':
      return {
        ...state,
        isLoggined: action.payload
      };

    case 'user/SET_UserShoppingCart':
      return {
        ...state,
        userShoppingCart: action.payload
      };

    case 'user/SET_UserInformation':
      return {
        ...state,
        userInformation: action.payload
      };

    case 'user/SET_UserAddress':
      return {
        ...state,
        userAddress: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;