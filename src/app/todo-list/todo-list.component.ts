import { Component, inject, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectTodos } from '../state/todos.selectors'
import { CommonModule } from '@angular/common'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { todosActions } from '../state/todos.actions'

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<p>todos:</p>
    <ul>
      @for (todo of todos$ | async; track todo.id) {
      <li>{{ todo.text }}</li>
      }
    </ul>
    <input
      type="text"
      placeholder="new todo"
      [formControl]="input"
      (keyup.enter)="onAddTodo()"
    /> `,
})
export class TodoListComponent {
  private store = inject(Store)
  input = new FormControl('')
  todos$ = this.store.select(selectTodos)

  onAddTodo() {
    const text = this.input.value!
    this.store.dispatch(todosActions.addTodo({ text }))
    this.input.reset()
  }
}
