import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideStore } from '@ngrx/store'
import { todosReducer } from './state/todos.reducer';
import { provideHttpClient } from '@angular/common/http';
import { graphqlProvider } from './graphql.provider'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ todos: todosReducer }), provideHttpClient(), graphqlProvider,
  ],
}
