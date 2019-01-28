import React, { Component } from 'react';
import classNames from 'classnames';

import { EFilters } from '../enums';

interface IProps {
    current: EFilters;
    onChange(filter: EFilters): void;
};

export default class TodoFilter extends Component<IProps> {
    handleClick = (filter: EFilters) => {
        this.props.onChange(filter);
    };

    render() {
        const { current } = this.props;

        return (
            <ul className="filters">
                <li>
                    <a
                        className={classNames({selected: current === EFilters.ALL})}
                        href="#"
                        onClick={() => this.handleClick(EFilters.ALL)}
                    >All</a>
                </li>
                <li>
                    <a
                        className={classNames({selected: current === EFilters.ACTIVE})}
                        href="#"
                        onClick={() => this.handleClick(EFilters.ACTIVE)}
                    >Active</a>
                </li>
                <li>
                    <a
                        className={classNames({selected: current === EFilters.COMPLETED})}
                        href="#"
                        onClick={() => this.handleClick(EFilters.COMPLETED)}
                    >Completed</a>
                </li>
            </ul>
        );
    }
}
