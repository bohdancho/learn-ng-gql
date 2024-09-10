import { createReducer, on } from '@ngrx/store'
import { Todo } from '../../../shared/todo.model'
import { TodosActions, TodosApiActions } from './todos.actions'

export const initialState: ReadonlyArray<Todo> = []

export const todosReducer = createReducer(
  initialState,
  on(TodosApiActions.retrievedTodosList, (_, { todos }) => {
    console.log(todos)
    return todos
  }),
  on(TodosActions.addTodo, (state, todo) => [...state, todo]),
  on(TodosActions.removeTodo, (state, { id }) =>
    state.filter((todo) => todo.id !== id)
  ),
  on(TodosActions.setTodoDone, (state, { id, done }) =>
    state.map((todo) => {
      if (todo.id !== id) return todo
      return { ...todo, done }
    })
  )
)
