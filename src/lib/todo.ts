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

export const validateTodoLabel = (label: string): boolean => label.trim().length > 0;

export const createTodo = (label: string): Todo => ({
    label,
    uuid: uuid(),
    completed: false,
});

export const filterTodosByType = (todos: Todo[], type: TodoFilterType): Todo[] =>
    type === TodoFilterType.All
        ? todos
        : todos.filter(({ completed }) =>
              type === TodoFilterType.Completed ? completed : !completed,
          );
