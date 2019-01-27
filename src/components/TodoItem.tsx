import React, { Component } from 'react';
import classNames from 'classnames';

import { TodoInput } from '.';

export interface TodoItemProps {
    todo: Todo;
    editing: boolean;
    onEditStart: (uuid: TodoUUID) => void;
    onEditCancel: () => void;
    onTodoChange: (editedTodo: Todo) => void;
    onDestroy: (uuid: TodoUUID) => void;
}

class TodoItem extends Component<TodoItemProps> {
    handleTodoChange = (nextTodoProps: Partial<Todo>) => {
        const { todo, onTodoChange } = this.props;
        const nextTodo = {
            ...todo,
            ...nextTodoProps,
        };
        onTodoChange(nextTodo);
    };

    handleEditDone = (newLabel: string) => {
        this.handleTodoChange({ label: newLabel });
    };

    handleEditCancel = () => {
        const { onEditCancel } = this.props;

        onEditCancel();
    };

    handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        this.handleTodoChange({ completed: event.target.checked });
    };

    handleLabelDoubleClick: React.MouseEventHandler<HTMLLabelElement> = () => {
        const {
            onEditStart,
            todo: { uuid },
        } = this.props;

        onEditStart(uuid);
    };

    handleDestroyClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        const {
            onDestroy,
            todo: { uuid },
        } = this.props;

        onDestroy(uuid);
    };

    render(): React.ReactNode {
        const {
            todo: { uuid, label, completed },
            editing,
        } = this.props;

        return (
            <li className={classNames({ completed, editing })}>
                <div className="view">
                    <input
                        id={uuid}
                        className="toggle"
                        type="checkbox"
                        onChange={this.handleCheckboxChange}
                        checked={completed}
                    />
                    <label htmlFor={uuid} onDoubleClick={this.handleLabelDoubleClick}>
                        {label}
                    </label>
                    <button className="destroy" type="button" onClick={this.handleDestroyClick} />
                </div>
                {editing && (
                    <TodoInput
                        className="edit"
                        onCreate={this.handleEditDone}
                        onCancel={this.handleEditCancel}
                        value={label}
                    />
                )}
            </li>
        );
    }
}

export default TodoItem;
