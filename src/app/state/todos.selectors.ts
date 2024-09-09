import { createFeatureSelector } from '@ngrx/store'
import { Todo } from '../../../shared/todo.model'

export const selectTodos = createFeatureSelector<ReadonlyArray<Todo>>('todos')
