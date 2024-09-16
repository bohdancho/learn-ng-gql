import { createFeatureSelector, createSelector } from '@ngrx/store'
import { TodosState } from './todos.reducer'

export const selectTodosState = createFeatureSelector<TodosState>('todos')

export const selectTodos = createSelector(
  selectTodosState,
  (state) => state.data
)

export const selectTodosInitialLoading = createSelector(
  selectTodosState,
  (state) => state.isInitialLoading
)

export const selectTodoById = (id: string) =>
  createSelector(selectTodos, (todos) => todos.find((x) => x.id === id))
