import React, { Component } from 'react';

import { filterTodosByType, TodoFilterType } from '../lib';

import TodoItem from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    selectedFilter: TodoFilterType;
    onTodosChange: (nextTodos: Todo[]) => void;
}

interface TodoListState {
    toggleAllChecked: boolean;
    editUuid: TodoUUID | undefined;
}

function areAllTodosCompleted(todos: Todo[]) {
    return todos.every(({ completed }) => completed);
}

class TodoList extends Component<TodoListProps, TodoListState> {
    state = {
        toggleAllChecked: areAllTodosCompleted(this.props.todos),
        editUuid: undefined,
    };

    componentDidUpdate(prevProps: TodoListProps) {
        const { todos } = this.props;

        if (todos !== prevProps.todos) {
            this.setState({
                toggleAllChecked: areAllTodosCompleted(todos),
            });
        }
    }

    handleToggleAllChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { todos, onTodosChange } = this.props;
        const { checked } = event.target;
        const nextTodos = todos.map((todo) => ({ ...todo, completed: checked }));

        this.setState({
            toggleAllChecked: checked,
        });
        onTodosChange(nextTodos);
    };

    handleEditStart = (editUuid: TodoUUID) => {
        this.setState({
            editUuid,
        });
    };

    handleTodoChange = (nextTodo: Todo) => {
        const { todos, onTodosChange } = this.props;
        const nextTodos = todos.map((todo) => (todo.uuid === nextTodo.uuid ? nextTodo : todo));

        this.handleEditCancel();
        onTodosChange(nextTodos);
    };

    handleEditCancel = () => {
        this.setState({
            editUuid: undefined,
        });
    };

    handleTodoDestroy = (uuid: TodoUUID) => {
        const { todos, onTodosChange } = this.props;
        const nextTodos = todos.filter((todo) => todo.uuid !== uuid);

        onTodosChange(nextTodos);
    };

    render() {
        const { todos, selectedFilter } = this.props;
        const { toggleAllChecked, editUuid } = this.state;
        const visibleTodos = filterTodosByType(todos, selectedFilter);

        return (
            <section className="main">
                <input
                    id="toggle-all"
                    className="toggle-all"
                    type="checkbox"
                    checked={toggleAllChecked}
                    onChange={this.handleToggleAllChange}
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul className="todo-list">
                    {visibleTodos.map((todo) => (
                        <TodoItem
                            key={todo.uuid}
                            todo={todo}
                            editing={editUuid === todo.uuid}
                            onEditStart={this.handleEditStart}
                            onEditCancel={this.handleEditCancel}
                            onTodoChange={this.handleTodoChange}
                            onDestroy={this.handleTodoDestroy}
                        />
                    ))}
                </ul>
            </section>
        );
    }
}

export default TodoList;
