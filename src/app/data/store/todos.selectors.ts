import { createFeatureSelector } from '@ngrx/store'
import { TodosStore } from './todos.reducer'

export const selectTodos = createFeatureSelector<TodosStore>('todos')
