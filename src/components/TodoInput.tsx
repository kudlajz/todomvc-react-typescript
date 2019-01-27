import React, { Component } from 'react';
import { isEnterKey, validateTodoLabel } from '../lib';

type TodoInputProps = {
    onTodoCreate: (value: string) => void;
};

type TodoInputState = {
    value: string;
};

class TodoInput extends Component<TodoInputProps, TodoInputState> {
    state = {
        value: '',
    };

    handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

    handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        const { onTodoCreate } = this.props;
        const { value } = this.state;

        if (validateTodoLabel(value) && isEnterKey(event)) {
            onTodoCreate(value);
            this.setState({
                value: '',
            });
        }
    };

    render() {
        const { value } = this.state;

        return (
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus
                onKeyUp={this.handleKeyUp}
                onChange={this.handleChange}
                value={value}
            />
        );
    }
}

export default TodoInput;
