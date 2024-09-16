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
    logError(error)
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
    logError(error)
    return {
      ...state,
      data: state.data.filter((x) => x.id !== id),
    }
  }),
  on(TodosActions.deleteTodoRunning, (state, { todo }) => ({
    ...state,
    data: state.data.filter((x) => x.id !== todo.id),
  })),
  on(TodosActions.deleteTodoFailure, (state, { error, todo }) => {
    logError(error)
    return {
      ...state,
      data: [...state.data, todo],
    }
  }),
  on(TodosActions.updateTodoRunning, (state, { newTodo }) => ({
    ...state,
    data: state.data.map((x) => (x.id === newTodo.id ? newTodo : x)),
  })),
  on(TodosActions.updateTodoFailure, (state, { error, oldTodo }) => {
    logError(error)
    return {
      ...state,
      data: state.data.map((x) => (x.id === oldTodo.id ? oldTodo : x)),
    }
  })
)

function logError(error: string) {
  alert(error)
}
