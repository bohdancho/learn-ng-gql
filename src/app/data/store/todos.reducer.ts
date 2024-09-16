import { createReducer, on } from '@ngrx/store'
import { TodosActions } from './todos.actions'
import { TodoModel } from '@core/domain/todo/todo.model'

export type TodosState = {
  data: TodoModel[]
  isInitialLoading: boolean
}

export const initialTodosState: TodosState = {
  data: [],
  isInitialLoading: true,
}

export const todosReducer = createReducer(
  initialTodosState,
  on(TodosActions.loadTodosSuccess, (_, { todos }) => ({
    data: todos,
    isInitialLoading: false,
    isRunning: false,
  })),
  on(TodosActions.loadTodosFailure, (_, { error }) => {
    alert(error)
    return {
      data: [],
      isInitialLoading: false,
    }
  }),
  on(TodosActions.createTodoRunning, (state, { todo }) => ({
    ...state,
    data: [...state.data, todo],
  })),
  on(TodosActions.createTodoFailure, (state, { error, id }) => {
    alert(error)
    return {
      ...state,
      data: state.data.filter((x) => x.id !== id),
    }
  }),
  on(TodosActions.deleteTodoRunning, (state, { id }) => ({
    ...state,
    data: state.data.filter((x) => x.id !== id),
  })),
  on(TodosActions.deleteTodoFailure, (state, { error, todo }) => {
    alert(error)
    return {
      ...state,
      data: [...state.data, todo],
    }
  }),
  on(TodosActions.updateTodoRunning, (state, todo) => ({
    ...state,
    data: state.data.map((x) => (x.id === todo.id ? todo : x)),
  })),
  on(TodosActions.updateTodoFailure, (state, { error, todo }) => {
    alert(error)
    return {
      ...state,
      data: state.data.map((x) => (x.id === todo.id ? todo : x)),
    }
  })
)
