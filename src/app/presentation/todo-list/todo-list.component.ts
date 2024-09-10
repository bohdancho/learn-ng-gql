import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { CommonModule } from '@angular/common'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { TodosActions, TodosApiActions } from '../../data/store/todos.actions'
import { TodoItemComponent } from './todo.component'
import { TodoRepository } from '../../data/repository/todo.repository'
import { selectTodos } from '@data/store/todos.selectors'

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TodoItemComponent],
  template: `<p>todos:</p>
    <ul>
      @for (todo of (todos$ | async)?.data; track todo.id) {
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
    </p>`,
})
export class TodoListComponent {
  private store = inject(Store)
  private todoRepository = inject(TodoRepository)
  newTodoInput = new FormControl('', [Validators.required])
  todos$ = this.store.select(selectTodos)

  constructor() {
    this.todoRepository
      .retrieveTodos()
      .pipe(takeUntilDestroyed())
      .subscribe((todos) => {
        this.store.dispatch(TodosApiActions.retrievedTodoList({ data: todos }))
      })
  }

  onAdd() {
    if (this.newTodoInput.invalid) {
      this.newTodoInput.markAsDirty()
      return
    }
    const text = this.newTodoInput.value!
    // this.todoRepository.addTodo(text).subscribe(({ data }) => {
    //   if (data) {
    //     this.store.dispatch(TodosActions.addTodo(data.addTodo))
    //   }
    // })
    this.newTodoInput.reset()
  }

  onRemove(id: number) {
    this.todoRepository
      .removeTodo(id)
      .subscribe(() => this.store.dispatch(TodosActions.removeTodo({ id })))
  }

  onSetDone(id: number, done: boolean) {
    this.todoRepository
      .setTodoDone(id, done)
      .subscribe(() =>
        this.store.dispatch(TodosActions.setTodoDone({ id, done }))
      )
  }
}
