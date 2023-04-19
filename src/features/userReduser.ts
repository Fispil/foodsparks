import { getitemsCart } from "../api/fetchCart";
import ShoppingCart from "../types/cartTypes";

type SetIsLogginedAction = {
  type: 'user/SET_IsLoggined';
  payload: boolean;
};

type SetUserShoppingCartAction = {
  type: 'user/SET_UserShoppingCart';
  payload: ShoppingCart;
};

const setIsLoggined = (isLoggined: boolean): SetIsLogginedAction => ({
  type: 'user/SET_IsLoggined',
  payload: isLoggined
});

const setShoppingCart = (shoppingCart: ShoppingCart): SetUserShoppingCartAction => ({
  type: 'user/SET_UserShoppingCart',
  payload: shoppingCart
});

type Action = SetIsLogginedAction | SetUserShoppingCartAction;

export const actions = { setIsLoggined, setShoppingCart };

type State = {
  userShoppingCart: ShoppingCart;
  isLoggined: boolean;
};

const defaultState: State = {
  isLoggined: false ,
  userShoppingCart: {
    productAmount: [],
    userId: null,
    sum: 0
  },
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

    default:
      return state;
  }
};

export default userReducer;