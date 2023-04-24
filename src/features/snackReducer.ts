import { AlertColor } from "@mui/material/Alert";

type SetIsActiveAction = {
  type: 'user/SET_IsActive';
  payload: boolean;
};


const setIsActive = (isActive: boolean): SetIsActiveAction => ({
  type: 'user/SET_IsActive',
  payload: isActive
});

type SetSeverity = {
  type: 'user/SET_Severity';
  payload: AlertColor | undefined;
};

const setSeverity = (severity: AlertColor | undefined): SetSeverity => ({
  type: 'user/SET_Severity',
  payload: severity
});


type SetMessage = {
  type: 'user/SET_Message';
  payload: string;
};


const setMessage = (message: string): SetMessage => ({
  type: 'user/SET_Message',
  payload: message
});

type Action = SetIsActiveAction | SetSeverity | SetMessage;

export const actions = { setIsActive, setSeverity, setMessage };

type State = {
  isActive: boolean,
  severity: AlertColor | undefined,
  message: string
};

const defaultState: State = {
  isActive: false,
  severity: 'success',
  message: ''
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const snackReducer = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case 'user/SET_IsActive':
      return {
        ...state,
        isActive: action.payload
      };

    case 'user/SET_Severity':
      return {
        ...state,
        severity: action.payload
      };

    case 'user/SET_Message':
      return {
        ...state,
        message: action.payload
      };

    default:
      return state;
  }
};

export default snackReducer;