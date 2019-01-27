import React, { Component } from 'react';

import TodoFilters from './TodoFilters';
import { filterTodosByType, TodoFilterType } from '../lib';

type TodoFooterProps = {
    todos: Todo[];
    selectedFilter: TodoFilterType;
    onTodosChange: (nextTodos: Todo[]) => void;
    onFilterChange: (nextFilter: TodoFilterType) => void;
};

class TodoFooter extends Component<TodoFooterProps> {
    handleClearCompletedClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        const { todos, onTodosChange } = this.props;
        const nextTodos = filterTodosByType(todos, TodoFilterType.Active);

        onTodosChange(nextTodos);
    };

    render() {
        const { todos, selectedFilter, onFilterChange } = this.props;
        const totalCount = todos.length;
        const completedCount = filterTodosByType(todos, TodoFilterType.Completed).length;

        if (totalCount === 0) {
            return null;
        }

        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{totalCount - completedCount}</strong> item left
                </span>
                <TodoFilters selectedFilter={selectedFilter} onFilterChange={onFilterChange} />
                {completedCount > 0 && (
                    <button className="clear-completed" onClick={this.handleClearCompletedClick}>
                        Clear completed
                    </button>
                )}
            </footer>
        );
    }
}

export default TodoFooter;
