import { Component, inject, InjectionToken } from '@angular/core'
import { Store } from '@ngrx/store'
import { CommonModule } from '@angular/common'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { TodoItemComponent } from './todo.component'
import { TodoListFacadeContract } from './todo-list.facade-contract'
import { TodoListFacade } from './todo-list.facade'
import { TodosActions } from '@data/store/todos.actions'

const FACADE_TOKEN = new InjectionToken<TodoListFacadeContract>(
  'todoList.facade'
)

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TodoItemComponent],
  providers: [{ provide: FACADE_TOKEN, useClass: TodoListFacade }],
  template: ` @if (facade.getViewState().isLoading$ | async) {Loading...} @else
    {
    <p>todos:</p>
    <ul>
      @for (todo of facade.getViewState().todos$ | async; track todo.id) {
      <app-todo-item
        [todo]="todo"
        (remove)="this.facade.deleteTodo(todo.id)"
        (update)="this.facade.updateTodo($event)"
      />
      }
    </ul>
    <input
      type="text"
      placeholder="new todo"
      [formControl]="newTodoInput"
      (blur)="newTodoInput.markAsPristine()"
      (keyup.enter)="onCreate()"
    />
    <p *ngIf="newTodoInput.invalid && newTodoInput.dirty">
      Please enter a valid todo
    </p>
    }`,
})
export class TodoListComponent {
  private store = inject(Store)
  public facade = inject(FACADE_TOKEN)
  newTodoInput = new FormControl('', [Validators.required])

  constructor() {
    this.store.dispatch(TodosActions.loadTodos())
  }

  onCreate() {
    if (this.newTodoInput.invalid) {
      this.newTodoInput.markAsDirty()
      return
    }
    const text = this.newTodoInput.value!
    this.facade.createTodo(text)
    this.newTodoInput.reset()
  }
}
