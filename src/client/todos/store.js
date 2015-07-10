import {fromJS} from 'immutable';
import * as actions from './actions';
import revive from './revive';
import Todo from './todo';
import getRandomString from '../lib/getrandomstring';
import {Range} from 'immutable';

const initialState = revive(fromJS({
    editables: {},
    // New Todo data. Imagine new, not yet saved Todo, is being edited, and
    // changes are persisted on server. Therefore we need to revive it as well.
    newTodo: {
      title: ''
    },
    // Initial state can contain prefetched lists and maps. List for array, map
    // for object. We can also use sortedByTitle list, if we need sorted data.
    list: [
      {id: 1, title: 'consider ‘stop doing’ app'}
    ]
}));

export default function store(state = initialState, action = []) {
  const [type, data] = action

  switch (type) {
    case actions.ADD_HUNDRED_TODOS: {
      return state.update('list', list => list.withMutations(list => {
        Range(0, 100).forEach(i => {
          const id = getRandomString();
          list.push(new Todo({
            id,
            title: `Item #${id}`
          }));
        });
      }));
    }

    case actions.ADD_TODO: {
      return state
        .update('list', (list) => {
          // Always denote what data represents. Favour readability over wtf.
          // Try to resist being smart ass. Fuck pride.
          // https://www.youtube.com/watch?v=ruhFmBrl4GM
          const todo = data;
          const newTodo = todo.merge({
            id: getRandomString()
          });
          return list.push(newTodo);
        })
        .set('newTodo', new Todo);
    }

    case actions.CLEAR_ALL: {
      return state
        .update('list', list => list.clear())
        .set('newTodo', new Todo);
    }

    case actions.DELETE_TODO: {
      const todo = data;
      return state.update('list', list => list.delete(list.indexOf(todo)));
    }

    case actions.ON_EDITABLE_SAVE: {
      const {id, name, value} = data;
      return state.update('list', list => {
        const idx = list.findIndex(todo => todo.id === id);
        return list.setIn([idx, name], value);
      });
    }

    case actions.ON_EDITABLE_STATE: {
      const {id, name, state} = data;
      return state.setIn(['editables', id, name], state);
    }

    case actions.ON_NEW_TODO_FIELD_CHANGE: {
      const {name, value} = data;
      return state.setIn(['newTodo', name], value);
    }

    default: {
      return state;
    }
  }
}
