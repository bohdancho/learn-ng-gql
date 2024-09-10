import { Component, EventEmitter, Input, Output } from '@angular/core'
import { TodoModel } from '@core/domain/todo/todo.model'

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  template: `<li>
    {{ todo.text }}
    <input
      type="checkbox"
      [checked]="todo.done"
      (click)="onSetDone($event.target!)"
    />
    <button (click)="remove.emit()">Remove</button>
  </li>`,
})
export class TodoItemComponent {
  @Input() todo!: TodoModel
  @Output() setDone = new EventEmitter<boolean>()
  @Output() remove = new EventEmitter<void>()

  onSetDone(target: EventTarget) {
    const checkboxElem = target as HTMLInputElement
    const done = checkboxElem.checked
    this.setDone.emit(done)
  }
}
