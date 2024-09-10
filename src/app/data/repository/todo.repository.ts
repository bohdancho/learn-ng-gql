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

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      done
    }
  }
`

const REMOVE_TODO = gql`
  mutation RemoveTodo($id: Int!) {
    removeTodo(id: $id)
  }
`

const SET_TODO_DONE = gql`
  mutation SetTodoDone($id: Int!, $done: Boolean!) {
    setTodoDone(id: $id, done: $done)
  }
`

@Injectable({
  providedIn: 'root',
})
export class TodoRepository implements ITodoRepository {
  private apollo = inject(Apollo)
  constructor() {}

  retrieveTodos() {
    return this.apollo
      .watchQuery<{ todos: TodoModel[] }>({
        query: GET_TODOS,
      })
      .valueChanges.pipe(map(({ data }) => data!.todos))
  }

  addTodo(text: string) {
    return this.apollo
      .mutate<{ addTodo: TodoModel }>({
        mutation: ADD_TODO,
        variables: {
          text,
        },
      })
      .pipe(map(({ data }) => data!.addTodo))
  }

  removeTodo(id: number) {
    return this.apollo
      .mutate({
        mutation: REMOVE_TODO,
        variables: {
          id,
        },
      })
      .pipe(map(() => null))
  }

  setTodoDone(id: number, done: boolean) {
    return this.apollo
      .mutate({
        mutation: SET_TODO_DONE,
        variables: {
          id,
          done,
        },
      })
      .pipe(map(() => null))
  }
}
