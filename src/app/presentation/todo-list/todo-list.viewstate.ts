import { TodoModel } from '@core/domain/todo/todo.model'
import { Observable } from 'rxjs'

export interface TodoListViewState {
  todos$: Observable<TodoModel[]>
  isLoading$: Observable<boolean>
}
