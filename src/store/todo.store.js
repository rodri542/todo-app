import { Todo } from "../todos/models/todo.models";


export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
};


const state = {
    todos: [
        new Todo('Learn Vue.js'),
        new Todo('Learn JS'),
        new Todo('Learn Angular'),
        new Todo('Learn React'),
        new Todo('Learn Svelte'),

    ],
    fiters: Filters.All
};

const initStore = () => {
    loadStore();
    console.log('Store initialized');
};

const loadStore = () => {
    if (!localStorage.getItem('state')) return;
    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter;
};

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
};

const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Option ${filter} not supported`);
    }
};

const addTodo = (description) => {
    if (!description) {
        throw new Error('Description is required');
    }
    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
};

const toggleTodo = (todoId) => {
    if (!todoId) {
        throw new Error('id is required');
    }
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    })

    saveStateToLocalStorage();

};

const deleteTodo = (todoId) => {
    if (!todoId) {
        throw new Error('id is required');
    }
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();

};

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
};

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();

};

const getCurrentFilter = () => {
    return state.filter;
};


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}

