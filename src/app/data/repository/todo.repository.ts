import { inject, Injectable } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { ITodoRepository } from '@core/repository/todo.repository'
import { map } from 'rxjs'
import { TodoModel } from '@core/domain/todo/todo.model'

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`

const CREATE_TODO = gql`
  mutation CreateTodo($todo: TodoInput!) {
    createTodo(todo: $todo)
  }
`

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    removeTodo(id: $id)
  }
`

const UPDATE_TODO = gql`
  mutation UpdateTodo($todo: TodoInput!) {
    updateTodo(todo: $todo)
  }
`

@Injectable({
  providedIn: 'root',
})
export class TodoRepository implements ITodoRepository {
  private apollo = inject(Apollo)
  constructor() {}

  getTodos() {
    return this.apollo
      .query<{ todos: TodoModel[] }>({
        query: GET_TODOS,
      })
      .pipe(map(({ data }) => data!.todos))
  }

  createTodo(todo: TodoModel) {
    return this.apollo
      .mutate<{ addTodo: TodoModel }>({
        mutation: CREATE_TODO,
        variables: {
          todo,
        },
      })
      .pipe(map(() => null))
  }

  deleteTodo(id: number) {
    return this.apollo
      .mutate({
        mutation: DELETE_TODO,
        variables: {
          id,
        },
      })
      .pipe(map(() => null))
  }

  updateTodo(todo: TodoModel) {
    return this.apollo
      .mutate({
        mutation: UPDATE_TODO,
        variables: {
          todo,
        },
      })
      .pipe(map(() => null))
  }
}
