import React from 'react';
import classNames from 'classnames';

import { TodoFilterType } from '../lib';

export interface TodoFiltersProps {
    selectedFilter: TodoFilterType;
    onFilterChange: (filter: TodoFilterType) => void;
}

const filters = [
    { type: TodoFilterType.All, label: 'All' },
    { type: TodoFilterType.Active, label: 'Active' },
    { type: TodoFilterType.Completed, label: 'Completed' },
];

function handleFilterClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    type: TodoFilterType,
    onFilterChange: TodoFiltersProps['onFilterChange'],
) {
    event.preventDefault();
    onFilterChange(type);
}

const TodoFilters: React.FunctionComponent<TodoFiltersProps> = ({
    selectedFilter,
    onFilterChange,
}) => (
    <ul className="filters">
        {filters.map(({ type, label }) => (
            <li key={label}>
                <a
                    href={`#/${label}`}
                    className={classNames({ selected: type === selectedFilter })}
                    onClick={(event) => handleFilterClick(event, type, onFilterChange)}
                >
                    {label}
                </a>
            </li>
        ))}
    </ul>
);

export default TodoFilters;
