import React, { Component } from 'react';
import { isEnterKey, validateTodoLabel, isEscKey } from '../lib';

type TodoInputProps = {
    onCreate: (value: string) => void;
    onCancel?: () => void;
    className?: string;
    placeholder?: string;
    value?: string;
};

type TodoInputState = {
    value: string;
};

class TodoInput extends Component<TodoInputProps, TodoInputState> {
    state = {
        value: this.props.value || '',
    };

    handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

    handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        const { onCreate, onCancel } = this.props;
        const { value } = this.state;

        if (validateTodoLabel(value) && isEnterKey(event)) {
            onCreate(value);
            this.setState({
                value: '',
            });
        }

        if (onCancel && isEscKey(event)) {
            onCancel();
        }
    };

    render() {
        const { className, placeholder } = this.props;
        const { value } = this.state;

        return (
            <input
                className={className}
                placeholder={placeholder}
                autoFocus
                onKeyUp={this.handleKeyUp}
                onChange={this.handleChange}
                value={value}
            />
        );
    }
}

export default TodoInput;
