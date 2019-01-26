import React, { Component, Fragment } from 'react';

import { PageHeader, PageFooter, TodoInput, TodoList, TodoFooter } from './components';
import {
    validateTodoLabel,
    createTodo,
    isEnterKey,
    isEscKey,
    getStoreItems,
    setStoreItems,
    filterTodosByType,
    TodoFilterType,
} from './lib';

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

    isEditing = () => this.state.editUuid !== undefined;

    getCompleted = () => this.state.todos.filter((todo) => todo.completed);

    handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({
            inputValue: event.target.value,
        });
    };

    handleInputKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        const { inputValue } = this.state;

        if (validateTodoLabel(inputValue) && isEnterKey(event)) {
            this.setState(({ todos, inputValue }) => ({
                todos: [...todos, createTodo(inputValue)],
                inputValue: '',
            }));
        }
    };

    handleEditStart = (editUuid: TodoUUID) => {
        const { todos } = this.state;
        const todo = todos.find((todo) => todo.uuid === editUuid);
        if (!todo) {
            return;
        }

        this.setState({
            editUuid,
            editValue: todo.label,
        });
    };

    handleEditKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (!this.isEditing()) {
            return;
        }
        const { editValue } = this.state;

        if (validateTodoLabel(editValue) && isEnterKey(event)) {
            this.setState(({ todos, editUuid, editValue }) => ({
                todos: todos.map((todo) => ({
                    ...todo,
                    label: todo.uuid === editUuid ? editValue : todo.label,
                })),
                editUuid: undefined,
                editValue: '',
            }));
        }

        if (isEscKey(event)) {
            this.setState({
                editUuid: undefined,
                editValue: '',
            });
        }
    };

    handleEditChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!this.isEditing()) {
            return;
        }

        this.setState({
            editValue: event.target.value,
        });
    };

    handleCheckboxChange = (uuid: TodoUUID, event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.target.checked;
        this.setState(({ todos }) => ({
            todos: todos.map((todo) => ({
                ...todo,
                completed: todo.uuid === uuid ? nextValue : todo.completed,
            })),
        }));
    };

    handleDestroy = (uuid: TodoUUID) => {
        this.setState(({ todos }) => ({
            todos: todos.filter((todo) => todo.uuid !== uuid),
        }));
    };

    handleClearCompleted = () => {
        this.setState(({ todos }) => ({
            todos: filterTodosByType(todos, TodoFilterType.Active),
        }));
    };

    handleToggleAllChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { checked } = event.target;
        this.setState(({ todos }) => ({
            toggleAllChecked: checked,
            todos: todos.map((todo) => ({ ...todo, completed: checked })),
        }));
    };

    handleFilterChange = (filter: TodoFilterType) => {
        this.setState({
            selectedFilter: filter,
        });
    };

    render() {
        const {
            inputValue,
            todos,
            editUuid,
            editValue,
            toggleAllChecked,
            selectedFilter,
        } = this.state;
        const visibleTodos = filterTodosByType(todos, selectedFilter);

        return (
            <Fragment>
                <section className="todoapp">
                    <PageHeader>
                        <TodoInput
                            onKeyUp={this.handleInputKeyUp}
                            onChange={this.handleInputChange}
                            value={inputValue}
                        />
                    </PageHeader>
                    <TodoList
                        todos={visibleTodos}
                        editUuid={editUuid}
                        editValue={editValue}
                        toggleAllChecked={toggleAllChecked}
                        onToggleAllChange={this.handleToggleAllChange}
                        onEditStart={this.handleEditStart}
                        onEditKeyUp={this.handleEditKeyUp}
                        onEditChange={this.handleEditChange}
                        onCheckboxChange={this.handleCheckboxChange}
                        onDestroy={this.handleDestroy}
                    />
                    <TodoFooter
                        totalCount={todos.length}
                        completedCount={this.getCompleted().length}
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
