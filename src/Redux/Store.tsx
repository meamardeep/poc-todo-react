import rootReducer from "./Reducers/IndexReducer";
import {legacy_createStore, compose} from 'redux';

//to setup redux dev tool with typescript
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore( rootReducer, composeEnhancers());

export default store;