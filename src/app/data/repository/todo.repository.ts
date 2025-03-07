import { inject, Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { ITodoRepository } from '@core/repository/todo.repository'
import { map } from 'rxjs'
import { TodoModel } from '@core/domain/todo/todo.model'
import {
  GetTodosQuery,
  CreateTodoMutation,
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
  UpdateTodoMutation,
  UpdateTodoMutationVariables,
  TodoUpdatedSubscription,
  TodoCreatedSubscription,
  TodoDeletedSubscription,
  GetTodosDocument,
  CreateTodoDocument,
  DeleteTodoDocument,
  UpdateTodoDocument,
  TodoCreatedDocument,
  TodoDeletedDocument,
  TodoUpdatedDocument,
} from '../../../__generated__/graphql'

@Injectable({
  providedIn: 'root',
})
export class TodoRepository implements ITodoRepository {
  private apollo = inject(Apollo)

  getTodos() {
    return this.apollo
      .query<GetTodosQuery>({
        query: GetTodosDocument,
      })
      .pipe(map(({ data }) => data.todos))
  }

  createTodo(todo: TodoModel) {
    return this.apollo
      .mutate<CreateTodoMutation>({
        mutation: CreateTodoDocument,
        variables: {
          todo,
        },
      })
      .pipe(map(() => null))
  }

  deleteTodo(id: string) {
    return this.apollo
      .mutate<DeleteTodoMutation>({
        mutation: DeleteTodoDocument,
        variables: {
          id,
        } satisfies DeleteTodoMutationVariables,
      })
      .pipe(map(() => null))
  }

  updateTodo(todo: TodoModel) {
    return this.apollo
      .mutate<UpdateTodoMutation>({
        mutation: UpdateTodoDocument,
        variables: {
          todo,
        } satisfies UpdateTodoMutationVariables,
      })
      .pipe(map(() => null))
  }

  todoCreated() {
    return this.apollo
      .subscribe<TodoCreatedSubscription>({
        fetchPolicy: 'no-cache',
        query: TodoCreatedDocument,
      })
      .pipe(map((result) => result.data!))
  }

  todoDeleted() {
    return this.apollo
      .subscribe<TodoDeletedSubscription>({
        fetchPolicy: 'no-cache',
        query: TodoDeletedDocument,
      })
      .pipe(map((result) => result.data!))
  }

  todoUpdated() {
    return this.apollo
      .subscribe<TodoUpdatedSubscription>({
        fetchPolicy: 'no-cache',
        query: TodoUpdatedDocument,
      })
      .pipe(map((result) => result.data!))
  }
}
