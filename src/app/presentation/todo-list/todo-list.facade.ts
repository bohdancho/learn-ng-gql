import { inject } from '@angular/core'
import { TodoListFacadeContract } from './todo-list.facade-contract'
import { Store } from '@ngrx/store'
import {
  selectTodos,
  selectTodosInitialLoading,
} from '@data/store/todos.selectors'
import { TodoModel } from '@core/domain/todo/todo.model'
import { TodosActions } from '@data/store/todos.actions'
import { TODO_REPOSITORY_TOKEN } from '../../injection'

export class TodoListFacade implements TodoListFacadeContract {
  private store = inject(Store)
  private todoRepository = inject(TODO_REPOSITORY_TOKEN)

  constructor() {
    this.store.dispatch(TodosActions.loadTodos())
    this.registerSubscriptions()
  }

  getViewState() {
    return {
      todos$: this.store.select(selectTodos),
      isLoading$: this.store.select(selectTodosInitialLoading),
    }
  }

  createTodo(text: string): void {
    this.store.dispatch(TodosActions.createTodo({ text }))
  }

  deleteTodo(todo: TodoModel): void {
    this.store.dispatch(TodosActions.deleteTodo({ todo }))
  }

  updateTodo(todo: TodoModel): void {
    this.store.dispatch(TodosActions.updateTodo({ newTodo: todo }))
  }

  private registerSubscriptions() {
    this.todoRepository
      .todoCreated()
      .subscribe(({ todoCreated }) =>
        this.store.dispatch(
          TodosActions.createTodoSuccess({ todo: todoCreated })
        )
      )

    this.todoRepository
      .todoDeleted()
      .subscribe(({ todoDeleted }) =>
        this.store.dispatch(TodosActions.deleteTodoSuccess({ id: todoDeleted }))
      )

    this.todoRepository
      .todoUpdated()
      .subscribe(({ todoUpdated }) =>
        this.store.dispatch(
          TodosActions.updateTodoSuccess({ todo: todoUpdated })
        )
      )
  }
}
