import { inject, Injectable } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { Todo } from '../../../shared/todo.model'

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
export class TodoService {
  private apollo = inject(Apollo)
  constructor() {}

  retreiveTodos() {
    return this.apollo.watchQuery<{ todos: Todo[] }>({
      query: GET_TODOS,
    }).valueChanges
  }

  addTodo(text: string) {
    return this.apollo.mutate<{ addTodo: Todo }>({
      mutation: ADD_TODO,
      variables: {
        text,
      },
    })
  }

  removeTodo(id: number) {
    return this.apollo.mutate({
      mutation: REMOVE_TODO,
      variables: {
        id,
      },
    })
  }

  setTodoDone(id: number, done: boolean) {
    return this.apollo.mutate({
      mutation: SET_TODO_DONE,
      variables: {
        id,
        done,
      },
    })
  }
}
