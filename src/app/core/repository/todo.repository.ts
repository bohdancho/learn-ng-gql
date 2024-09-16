import { TodoModel } from '@core/domain/todo/todo.model'
import { Observable } from 'rxjs'

export interface ITodoRepository {
  getTodos(): Observable<TodoModel[]>
  createTodo(todo: TodoModel): Observable<null>
  deleteTodo(id: string): Observable<null>
  updateTodo(todo: TodoModel): Observable<null>
}
