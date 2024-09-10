import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TodoListComponent } from './presentation/todo-list/todo-list.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoListComponent],
  template: `
    <main class="main">
      <h1>Welcome to 0815 todo app</h1>
      <app-todo-list />
    </main>

    <router-outlet />
  `,
})
export class AppComponent {}
