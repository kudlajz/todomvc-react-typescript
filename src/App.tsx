import React, { Component, Fragment } from 'react';

import { Header, TodoFilter, TodoList } from './components';
import { EFilters } from './enums';
import { ITodo } from './interfaces';
import withTodos from './withTodos';

interface IProps {
    todos: ITodo[];
};

interface IState {
    todos: ITodo[];
    currentFilter: EFilters;
};

class App extends Component<IProps, IState> {
    state = {
        todos: this.props.todos,
        currentFilter: EFilters.ALL,
    };

    handleChangeFilter = (filter: EFilters) => {
        this.setState({
            currentFilter: filter,
        });
    };

    handleClearCompleted = () => {
        this.setState(({ todos }) => ({
            todos: todos.filter((todo) => !todo.completed),
        }));
    };

    handleCreateTodo = (todo: ITodo) => {
        this.setState(({ todos }) => ({
            todos: [
                ...todos,
                todo,
            ],
        }));
    };

    handleUpdateTodo = (updatedTodo: ITodo) => {
        this.setState(({ todos }) => ({
            todos: todos.map((todo) => {
                if (todo.id === updatedTodo.id) {
                    return updatedTodo;
                }

                return todo;
            }),
        }));
    };

    getTodos = () => {
        const { todos, currentFilter } = this.state;

        switch (currentFilter) {
            case EFilters.ALL:
                return todos;
            case EFilters.ACTIVE:
                return todos.filter((todo) => !todo.completed);
            case EFilters.COMPLETED:
                return todos.filter((todo) => todo.completed);
        }
    };

    getNumberOfIncompleteTodos = () => this.state.todos.filter((todo: ITodo) => !todo.completed).length;

    render() {
        const todos = this.getTodos();

        return (
            <Fragment>
                <section className="todoapp">
                    <Header onSubmit={this.handleCreateTodo} />
                    {/* This section should be hidden by default and shown when there are todos */}
                    <TodoList
                        todos={todos}
                        onTodoChange={this.handleUpdateTodo}
                    />
                    {/* This footer should hidden by default and shown when there are todos */}
                    <footer className="footer">
                        {/* This should be `0 items left` by default */}
                        <span className="todo-count">
                            <strong>{this.getNumberOfIncompleteTodos()}</strong> items left
                        </span>
                        {/* Remove this if you don't implement routing */}
                        <TodoFilter
                            current={this.state.currentFilter}
                            onChange={this.handleChangeFilter}
                        />
                        {/* Hidden if no completed items are left ↓ */}
                        <button className="clear-completed" onClick={this.handleClearCompleted}>Clear completed</button>
                    </footer>
                </section>
                <footer className="info">
                    <p>Double-click to edit a todo</p>
                    {/* Change this out with your name and url ↓ */}
                    <p>
                        Created by <a href="http://todomvc.com">you</a>
                    </p>
                    <p>
                        Part of <a href="http://todomvc.com">TodoMVC</a>
                    </p>
                </footer>
            </Fragment>
        );
    }
}

export default withTodos(App);
