import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from '../features/userReduser';
import snackReducer from '../features/snackReducer';

const rootReducer = combineReducers({
  user: userReducer,
  snack: snackReducer,
});

// The `store` is passed to the Provider in `/src/index.tsx`
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;