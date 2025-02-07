import './style.css'
import { app } from './todos/app'
import todoStore from './store/todo.store'

todoStore.initStore();
app('#app');
