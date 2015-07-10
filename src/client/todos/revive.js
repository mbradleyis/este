import Todo from './todo';
import {Map} from 'immutable';

export default function(value) {
  return Map(value)
    .set('newTodo', new Todo(value.get('newTodo')))
    .update('list', (v) => v.map(todo => new Todo(todo)));
}
