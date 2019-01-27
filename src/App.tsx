import React, { Component, Fragment } from 'react';

import { PageHeader, PageFooter, TodoInput, TodoList, TodoFooter } from './components';
import { createTodo, getStoreItems, setStoreItems, TodoFilterType } from './lib';

interface AppState {
    todos: Todo[];
    selectedFilter: TodoFilterType;
}

class App extends Component<{}, AppState> {
    state = {
        todos: getStoreItems(),
        selectedFilter: TodoFilterType.All,
    };

    componentDidUpdate(_prevProps: any, prevState: AppState) {
        const { todos } = this.state;

        if (prevState.todos !== todos) {
            setStoreItems(todos);
        }
    }

    handleTodoCreate = (label: string) => {
        this.setState(({ todos }) => ({
            todos: [...todos, createTodo(label)],
        }));
    };

    handleTodosChange = (nextTodos: Todo[]) => {
        this.setState({
            todos: nextTodos,
        });
    };

    handleFilterChange = (filter: TodoFilterType) => {
        this.setState({
            selectedFilter: filter,
        });
    };

    render() {
        const { todos, selectedFilter } = this.state;

        return (
            <Fragment>
                <section className="todoapp">
                    <PageHeader>
                        <TodoInput
                            onCreate={this.handleTodoCreate}
                            className="new-todo"
                            placeholder="What needs to be done?"
                        />
                    </PageHeader>
                    <TodoList
                        todos={todos}
                        selectedFilter={selectedFilter}
                        onTodosChange={this.handleTodosChange}
                    />
                    <TodoFooter
                        todos={todos}
                        selectedFilter={selectedFilter}
                        onTodosChange={this.handleTodosChange}
                        onFilterChange={this.handleFilterChange}
                    />
                </section>
                <PageFooter />
            </Fragment>
        );
    }
}

export default App;
