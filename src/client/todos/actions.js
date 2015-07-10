import Promise from 'bluebird';
import setToString from '../lib/settostring';

export const MAX_TODO_TITLE_LENGTH = 42;

export const ADD_HUNDRED_TODOS = 'todos/addHundredTodos';
export function addHundredTodos() {
  return [ADD_HUNDRED_TODOS];
}

export const ADD_TODO = 'todos/addTodo';
export function addTodo(todo) {
  const title = todo.title.trim();
  if (!title) return;
  return [ADD_TODO, todo];
}

export const CLEAR_ALL = 'todos/clearAll';
export function clearAll() {
  return [CLEAR_ALL];
}

export const DELETE_TODO = 'todos/deleteTodo';
export function deleteTodo(todo) {
  return [DELETE_TODO, todo];
}

export const ON_EDITABLE_SAVE = 'todos/onEditableSave';
export function onEditableSave(id, name, value) {
  // Simulate async saving.
  return (dispatch, state) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({id, name, value});
      }, 500);
    });
    promise.then((v) => dispatch([ON_EDITABLE_SAVE, v]));
  }
}

export const ON_EDITABLE_STATE = 'todos/onEditableState';
export function onEditableState(id, name, state) {
  if (state) {
    state = state.set('value', state.value.slice(0, MAX_TODO_TITLE_LENGTH));
  }
  return [ON_EDITABLE_STATE, {id, name, state}];
}

export const ON_NEW_TODO_FIELD_CHANGE = 'todos/onNewTodoFieldChange';
export function onNewTodoFieldChange({target: {name, value}}) {
  switch (name) {
    case 'title':
      value = value.slice(0, MAX_TODO_TITLE_LENGTH);
      break;
  }
  return [ON_NEW_TODO_FIELD_CHANGE, {name, value}];
}
