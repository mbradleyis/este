import './newtodo.styl';
import * as actions from './actions';
import Component from '../components/component.react';
import React from 'react';
import immutable from 'immutable';
import {msg} from '../intl';

class NewTodo extends Component {

  static propTypes = {
    todo: React.PropTypes.instanceOf(immutable.Record)
  };

  static contextTypes = {
    dispatch: React.PropTypes.func
  };

  addTodoOnEnter(e) {
    if (e.key === 'Enter')
      return actions.addTodo(this.props.todo);
  }

  render() {
    const dispatch = this.context.dispatch;
    return (
      <input
        autoFocus
        className="new-todo"
        name="title"
        onChange={(e) => dispatch(actions.onNewTodoFieldChange(e))}
        onKeyDown={(e) => dispatch(this.addTodoOnEnter(e))}
        placeholder={msg('todos.newTodoPlaceholder')}
        value={this.props.todo.title}
      />
    );
  }

}

export default NewTodo;
