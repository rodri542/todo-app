import { createTodoHtml } from "./";


let element;

export const renderTodos = ( elementId, todos = [] ) => {

    if (!element) {
        element = document.querySelector(elementId);
    }
    //TODO: referencia
    if (!element) {
        throw new Error("element id doen't exist");
    }

    element.innerHTML = '';

    todos.forEach( todo => {
        element.append( createTodoHtml(todo) )
    });
};