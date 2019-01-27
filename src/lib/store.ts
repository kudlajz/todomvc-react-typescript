const STORE_KEY = 'TODOS';

export function getStoreItems(): Todo[] {
    return JSON.parse(localStorage.getItem(STORE_KEY) || '0') || [];
}

export function setStoreItems(todos: Todo[]): void {
    localStorage.setItem(STORE_KEY, JSON.stringify(todos));
}
