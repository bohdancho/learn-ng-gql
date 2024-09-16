import { inject } from '@angular/core'
import { TodoListFacadeContract } from './todo-list.facade-contract'
import { Store } from '@ngrx/store'
import {
  selectTodos,
  selectTodosInitialLoading,
} from '@data/store/todos.selectors'
import { TodoModel } from '@core/domain/todo/todo.model'
import { TodosActions } from '@data/store/todos.actions'

export class TodoListFacade implements TodoListFacadeContract {
  private store = inject(Store)

  constructor() {}

  getViewState() {
    return {
      todos$: this.store.select(selectTodos),
      isLoading$: this.store.select(selectTodosInitialLoading),
    }
  }

  createTodo(text: string): void {
    this.store.dispatch(TodosActions.createTodo({ text }))
  }

  deleteTodo(id: string): void {
    this.store.dispatch(TodosActions.deleteTodo({ id }))
  }

  updateTodo(todo: TodoModel): void {
    this.store.dispatch(TodosActions.updateTodo(todo))
  }
}
