import {fromJS} from 'immutable'
import Dispatcher from './dispatcher'
import todosStore from './todos/store'

const initialState = fromJS({});

function store(state = initialState, action) {
  state = state.update('todos', (t) => todosStore(t, action));
  return state;
}

export default new Dispatcher(store);

