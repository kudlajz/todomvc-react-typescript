import uuid from 'uuid';

declare global {
    type TodoUUID = string;

    interface Todo {
        uuid: TodoUUID;
        label: string;
        completed: boolean;
    }
}

export enum TodoFilterType {
    All,
    Active,
    Completed,
}

export const validateTodoLabel = (label: string) => label.trim().length > 0;

export const createTodo = (label: string) => ({
    label,
    uuid: uuid(),
    completed: false,
});

export const filterTodosByType = (todos: Todo[], type: TodoFilterType) =>
    type === TodoFilterType.All
        ? todos
        : todos.filter(({ completed }) =>
              type === TodoFilterType.Completed ? completed : !completed,
          );
