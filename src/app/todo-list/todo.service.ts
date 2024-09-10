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
}
