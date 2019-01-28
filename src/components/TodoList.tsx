import React, { Component } from 'react';

import Todo from './Todo';
import { ITodo } from '../interfaces';

interface IProps {
    todos: ITodo[];
    onTodoChange(todo: ITodo): void;
}

export default class TodoList extends Component<IProps> {
    render() {
        const { todos, onTodoChange } = this.props;

        if (todos.length === 0) {
            return null;
        }

        return (
            <section className="main">
                <input id="toggle-all" className="toggle-all" type="checkbox" />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            onChange={onTodoChange}
                        />
                    ))}
                </ul>
            </section>
        );
    }
}
