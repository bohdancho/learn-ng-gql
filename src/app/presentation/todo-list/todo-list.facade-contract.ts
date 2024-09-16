import { TodoModel } from '@core/domain/todo/todo.model'
import { TodoListViewState } from './todo-list.viewstate'

export interface TodoListFacadeContract {
  getViewState(): TodoListViewState
  createTodo(text: string): void
  deleteTodo(id: string): void
  updateTodo(todo: TodoModel): void
}
