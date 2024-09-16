import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { TodosActions } from './todos.actions'
import { TODO_REPOSITORY_TOKEN } from '../../injection'
import { catchError, map, of, switchMap } from 'rxjs'

@Injectable()
export class TodoEffects {
  actions$ = inject(Actions)
  repository = inject(TODO_REPOSITORY_TOKEN)

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTodos),
      switchMap(() =>
        this.repository.getTodos().pipe(
          map((todos) => TodosActions.loadTodosSuccess({ todos })),
          catchError((error: Error) =>
            of(TodosActions.loadTodosFailure({ error: JSON.stringify(error) }))
          )
        )
      )
    )
  )
}
