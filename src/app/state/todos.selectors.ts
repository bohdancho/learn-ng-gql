import { createFeatureSelector } from '@ngrx/store'
import { Todo } from '../todo-list/todo.model'

export const selectTodos = createFeatureSelector<ReadonlyArray<Todo>>('todos')
