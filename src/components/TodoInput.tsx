import React from 'react';

type TodoInputProps = {
    onKeyUp: React.KeyboardEventHandler<HTMLInputElement>;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
};

const TodoInput: React.FunctionComponent<TodoInputProps> = ({ onKeyUp, onChange, value }) => (
    <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyUp={onKeyUp}
        onChange={onChange}
        value={value}
    />
);

export default TodoInput;
