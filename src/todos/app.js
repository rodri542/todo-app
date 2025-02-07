import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store'
import { renderTodos, renderPending } from './use-cases';

const ElementIDs = {
    TodoFilters: '.filtro',
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    PendigCountLabel: '#pending-count'
}

export const app = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    };

    const updatePendingCount = () => {
        renderPending(ElementIDs.PendigCountLabel);
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput),
        todoListUL = document.querySelector(ElementIDs.TodoList),
        clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted),
        filtersUL = document.querySelectorAll(ElementIDs.TodoFilters);


    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;
        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if (!element || !isDestroyElement) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersUL.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersUL.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');
            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                    break;
            }

            displayTodos();

        });
    });

};
