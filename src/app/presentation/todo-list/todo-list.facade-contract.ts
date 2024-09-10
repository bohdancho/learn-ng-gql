import { TodoModel } from '@core/domain/todo/todo.model'
import { Observable } from 'rxjs'
import { TodoListViewState } from './todo-list.viewstate'

export interface TodoListFacadeContract {
  getViewState(): TodoListViewState
  addTodo(text: string): Observable<Omit<TodoModel, 'id'>>
  removeTodo(id: number): Observable<null>
  setTodoDone(id: number, done: boolean): Observable<null>
}
