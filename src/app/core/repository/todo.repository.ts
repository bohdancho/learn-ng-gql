import { TodoModel } from '@core/domain/todo/todo.model'
import { Observable } from 'rxjs'

export interface ITodoRepository {
  retrieveTodos(): Observable<TodoModel[]>
  addTodo(text: string): Observable<TodoModel>
  removeTodo(id: number): Observable<null>
  setTodoDone(id: number, done: boolean): Observable<null>
}
