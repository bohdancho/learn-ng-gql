import { inject, Injectable } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { ITodoRepository } from '@core/repository/todo.repository'
import { map } from 'rxjs'
import { TodoModel } from '@core/domain/todo/todo.model'
import { DocumentNode } from '@apollo/client/core'

@Injectable({
  providedIn: 'root',
})
export class TodoRepository implements ITodoRepository {
  private apollo = inject(Apollo)

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

  deleteTodo(id: string) {
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

  todoCreated() {
    return this.apollo
      .subscribe({
        fetchPolicy: 'no-cache',
        query: TODO_CREATED,
      })
      .pipe(map((result) => result.data as { todoCreated: TodoModel }))
  }

  todoDeleted() {
    return this.apollo
      .subscribe({
        fetchPolicy: 'no-cache',
        query: TODO_DELETED,
      })
      .pipe(map((result) => result.data as { todoDeleted: string }))
  }

  todoUpdated() {
    return this.apollo
      .subscribe({
        fetchPolicy: 'no-cache',
        query: TODO_UPDATED,
      })
      .pipe(map((result) => result.data as { todoUpdated: TodoModel }))
  }
}

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
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id)
  }
`

const UPDATE_TODO = gql`
  mutation UpdateTodo($todo: TodoInput!) {
    updateTodo(todo: $todo)
  }
`

const TODO_CREATED: DocumentNode = gql`
  subscription TodoCreated {
    todoCreated {
      id
      text
      done
    }
  }
`

const TODO_DELETED = gql`
  subscription TodoDeleted {
    todoDeleted
  }
`

const TODO_UPDATED = gql`
  subscription TodoUpdated {
    todoUpdated {
      id
      text
      done
    }
  }
`
