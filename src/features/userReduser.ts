type SetIsLogginedAction = {
  type: 'user/SET_IsLoggined';
  payload: boolean;
};

const setIsLoggined = (isLoggined: boolean): SetIsLogginedAction => ({
  type: 'user/SET_IsLoggined',
  payload: isLoggined
});

type Action = SetIsLogginedAction;

export const actions = { setIsLoggined };

type State = {
  isLoggined: boolean;
};

const defaultState: State = {
  isLoggined: false
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const userReducer = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case 'user/SET_IsLoggined':
      return {
        ...state,
        isLoggined: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;