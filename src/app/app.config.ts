import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideStore } from '@ngrx/store'
import { todosReducer } from './data/store/todos.reducer'
import { provideHttpClient } from '@angular/common/http'
import { graphqlProvider } from './graphql.provider'
import { TODO_REPOSITORY_TOKEN } from './injection'
import { TodoRepository } from '@data/repository/todo.repository'
import { provideEffects } from '@ngrx/effects'
import { TodoEffects } from '@data/store/todos.effects'
import { provideStoreDevtools } from '@ngrx/store-devtools'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ todos: todosReducer }),
    provideEffects(TodoEffects),
    provideHttpClient(),
    graphqlProvider,
    { provide: TODO_REPOSITORY_TOKEN, useClass: TodoRepository },
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
}
