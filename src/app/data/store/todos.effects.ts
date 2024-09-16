import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { TodosActions } from './todos.actions'
import { TODO_REPOSITORY_TOKEN } from '../../injection'
import { catchError, map, mergeMap, of, switchMap } from 'rxjs'
import * as uuid from 'uuid'

@Injectable()
export class TodoEffects {
  actions$ = inject(Actions)
  repository = inject(TODO_REPOSITORY_TOKEN)

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTodos),
      mergeMap(() =>
        this.repository.getTodos().pipe(
          map((todos) => TodosActions.loadTodosSuccess({ todos })),
          catchError((error: Error) =>
            of(TodosActions.loadTodosFailure({ error: JSON.stringify(error) }))
          )
        )
      )
    )
  )

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.createTodo),
      map(({ text }) =>
        TodosActions.createTodoRunning({
          todo: { text, done: false, id: nextGuid() },
        })
      )
    )
  )

  createTodoRunning$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.createTodoRunning),
      switchMap(({ todo }) =>
        this.repository.createTodo(todo).pipe(
          map(() => TodosActions.createTodoSuccess()),
          catchError((error: Error) =>
            of(
              TodosActions.createTodoFailure({
                error: JSON.stringify(error),
                id: todo.id,
              })
            )
          )
        )
      )
    )
  )
}

function nextGuid() {
  return uuid.v1()
}
