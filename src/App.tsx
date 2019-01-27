import React, { Component, Fragment } from 'react';

import { PageHeader, PageFooter, TodoInput, TodoList, TodoFooter } from './components';
import { createTodo, getStoreItems, setStoreItems, filterTodosByType, TodoFilterType } from './lib';

type AppState = {
    inputValue: string;
    todos: Todo[];
    editUuid?: TodoUUID;
    editValue: string;
    toggleAllChecked: boolean;
    selectedFilter: TodoFilterType;
};

class App extends Component<{}, AppState> {
    state = {
        inputValue: '',
        todos: getStoreItems(),
        editUuid: undefined,
        editValue: '',
        toggleAllChecked: false,
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

    handleClearCompleted = () => {
        this.setState(({ todos }) => ({
            todos: filterTodosByType(todos, TodoFilterType.Active),
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
        const completedCount = filterTodosByType(todos, TodoFilterType.Completed).length;

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
                        totalCount={todos.length}
                        completedCount={completedCount}
                        onClearClick={this.handleClearCompleted}
                        selectedFilter={selectedFilter}
                        onFilterChange={this.handleFilterChange}
                    />
                </section>
                <PageFooter />
            </Fragment>
        );
    }
}

export default App;
