import { createReducer, on } from '@ngrx/store'
import { Todo } from '../todo-list/todo.model'
import { todosActions } from './todos.actions'

export const initialState: ReadonlyArray<Todo> = []
let id = 0

export const todosReducer = createReducer(
  initialState,
  on(todosActions.addTodo, (state, { text }) => [
    ...state,
    { text, id: id++, done: false },
  ]),
  on(todosActions.removeTodo, (state, { id }) =>
    state.filter((todo) => todo.id !== id)
  )
)
