import React, { Component, ChangeEvent } from 'react';
import classNames from 'classnames';

import { ITodo } from '../interfaces';

interface IProps {
    todo: ITodo;
    onChange(todo: ITodo): void;
};

export default class Todo extends Component<IProps> {
    handleToggleCompleted = (event: ChangeEvent<HTMLInputElement>) => {
        const todo = {
            ...this.props.todo,
            completed: !this.props.todo.completed,
        };

        this.props.onChange(todo);
    };

    render() {
        const { todo } = this.props;

        return (
            <li className={classNames({
                'completed': todo.completed,
            })}>
                <div className="view">
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={todo.completed}
                        onChange={this.handleToggleCompleted}
                    />
                    <label>{todo.value}</label>
                    <button className="destroy" />
                </div>
                <input className="edit" defaultValue="Create a TodoMVC template" />
            </li>
        );
    }
}
