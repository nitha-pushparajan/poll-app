import { createStore } from 'redux';
import pollReducer from './reducers';

const store = createStore(
  pollReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;