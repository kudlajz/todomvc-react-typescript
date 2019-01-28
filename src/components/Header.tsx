import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import { uniqueId } from 'lodash';

import { ITodo } from '../interfaces';

interface IProps {
    onSubmit(todo: ITodo): void;
};

interface IState {
    currentValue: string
}

const createTodoObject = (value: string): ITodo => {
    return {
        id: Number(uniqueId()),
        value,
        completed: false,
    };
};

export default class Header extends Component<IProps, IState> {
    state = {
        currentValue: '',
    };

    reset = () => {
        this.setState({
            currentValue: '',
        });
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event;

        this.setState({
            currentValue: value,
        });
    };

    handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const todo = createTodoObject(this.state.currentValue);
            this.props.onSubmit(todo);
            this.reset();
        }
    };

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    value={this.state.currentValue}
                    autoFocus
                    onChange={this.handleChange}
                    onKeyDown={this.handleEnterKey}
                />
            </header>
        );
    }
}
    