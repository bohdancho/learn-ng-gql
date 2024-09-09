import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectTodos } from '../state/todos.selectors'
import { CommonModule } from '@angular/common'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
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
      [formControl]="input"
      (keyup.enter)="onAdd()"
    /> `,
})
export class TodoListComponent {
  private store = inject(Store)
  input = new FormControl('')
  todos$ = this.store.select(selectTodos)

  constructor() {
    this.todos$.subscribe(console.log)
  }

  onAdd() {
    const text = this.input.value!
    this.store.dispatch(todosActions.addTodo({ text }))
    this.input.reset()
  }

  onSetDone(id: number, done: boolean) {
    this.store.dispatch(todosActions.setDone({ id, done }))
  }

  onRemove(id: number) {
    this.store.dispatch(todosActions.removeTodo({ id }))
  }
}
