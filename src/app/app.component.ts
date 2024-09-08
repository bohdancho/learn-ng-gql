import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TodoListComponent } from './todo-list/todo-list.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoListComponent],
  template: `
    <main class="main"><app-todo-list /></main>

    <router-outlet />
  `,
})
export class AppComponent {
  title = 'learn-ng-gql'
}
