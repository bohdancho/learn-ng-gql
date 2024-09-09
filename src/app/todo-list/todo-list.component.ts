import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectTodos } from '../state/todos.selectors'
import { CommonModule } from '@angular/common'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { todosActions } from '../state/todos.actions'
import { TodoItemComponent } from './todo.component'

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TodoItemComponent],
  template: `<p>todos:</p>
    <ul>
      @for (todo of todos$ | async; track todo.id) {
      <app-todo-item
        [todo]="todo"
        (remove)="onRemove(todo.id)"
        (setDone)="onSetDone(todo.id, $event)"
      />
      }
    </ul>
    <input
      type="text"
      placeholder="new todo"
      [formControl]="newTodoInput"
      (blur)="newTodoInput.markAsPristine()"
      (keyup.enter)="onAdd()"
    />
    <p *ngIf="newTodoInput.invalid && newTodoInput.dirty">
      Please enter a valid todo
    </p> `,
})
export class TodoListComponent {
  private store = inject(Store)
  newTodoInput = new FormControl('', [Validators.required])
  todos$ = this.store.select(selectTodos)

  constructor() {
    this.todos$.subscribe(console.log)
  }

  onAdd() {
    if (this.newTodoInput.invalid) {
      this.newTodoInput.markAsDirty()
      return
    }
    const text = this.newTodoInput.value!
    this.store.dispatch(todosActions.addTodo({ text }))
    this.newTodoInput.reset()
  }

  onSetDone(id: number, done: boolean) {
    this.store.dispatch(todosActions.setDone({ id, done }))
  }

  onRemove(id: number) {
    this.store.dispatch(todosActions.removeTodo({ id }))
  }
}
