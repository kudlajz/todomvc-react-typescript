import React from 'react';

import TodoFilters, { TodoFiltersProps } from './TodoFilters';

type TodoFooterProps = {
    totalCount: number;
    completedCount: number;
    onClearClick: React.MouseEventHandler<HTMLButtonElement>;
};

const TodoFooter: React.FunctionComponent<TodoFooterProps & TodoFiltersProps> = ({
    totalCount,
    completedCount,
    onClearClick,
    selectedFilter,
    onFilterChange,
}) =>
    totalCount === 0 ? null : (
        <footer className="footer">
            <span className="todo-count">
                <strong>{totalCount - completedCount}</strong> item left
            </span>
            <TodoFilters selectedFilter={selectedFilter} onFilterChange={onFilterChange} />
            {completedCount > 0 && (
                <button className="clear-completed" onClick={onClearClick}>
                    Clear completed
                </button>
            )}
        </footer>
    );

export default TodoFooter;
