import { createReducer, on } from '@ngrx/store'
import { TodosActions, TodosApiActions } from './todos.actions'
import { TodoModel } from '@core/domain/todo/todo.model'

export type TodosStore = {
  data: ReadonlyArray<TodoModel>
  loading: boolean
}

export const initialState: TodosStore = { data: [], loading: true }

export const todosReducer = createReducer(
  initialState,
  on(TodosApiActions.retrievedTodoList, (_, { data }) => ({
    data,
    loading: false,
  })),
  on(TodosActions.addTodoSuccess, (state, todo) => ({
    data: [...state.data, todo],
    loading: false,
  }))
  // on(TodosActions.removeTodo, (state, { id }) =>
  //   state.filter((todo) => todo.id !== id)
  // ),
  // on(TodosActions.setTodoDone, (state, { id, done }) =>
  //   state.map((todo) => {
  //     if (todo.id !== id) return todo
  //     return { ...todo, done }
  //   })
  // )
)
