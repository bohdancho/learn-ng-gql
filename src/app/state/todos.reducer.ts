import { createReducer, on } from '@ngrx/store'
import { Todo } from '../../../shared/todo.model'
import { todosActions } from './todos.actions'

export const initialState: ReadonlyArray<Todo> = [
  { text: 'first todo', done: false, id: -2 },
  { text: 'second todo', done: true, id: -1 },
]
let id = 0

export const todosReducer = createReducer(
  initialState,
  on(todosActions.addTodo, (state, { text }) => [
    ...state,
    { text, id: id++, done: false },
  ]),
  on(todosActions.removeTodo, (state, { id }) =>
    state.filter((todo) => todo.id !== id)
  ),
  on(todosActions.setDone, (state, { id, done }) =>
    state.map((todo) => {
      if (todo.id !== id) return todo
      return { ...todo, done }
    })
  )
)
