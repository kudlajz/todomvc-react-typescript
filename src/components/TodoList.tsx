import React from 'react';

import TodoItem, { TodoItemProps } from './TodoItem';

type TodoListProps = {
    todos: Todo[];
    editUuid?: TodoUUID;
    toggleAllChecked: boolean;
    onToggleAllChange: React.ChangeEventHandler<HTMLInputElement>;
};

// This section should be hidden by default and shown when there are todos

const TodoList: React.FunctionComponent<TodoListProps & TodoItemProps> = ({
    todos,
    editUuid,
    toggleAllChecked,
    onToggleAllChange,
    ...editProps
}) => (
    <section className="main">
        <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={toggleAllChecked}
            onChange={onToggleAllChange}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.uuid}
                    {...todo}
                    editing={editUuid === todo.uuid}
                    {...editProps}
                />
            ))}
        </ul>
    </section>
);

export default TodoList;
