import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { TodosActions } from './todos.actions'
import { TODO_REPOSITORY_TOKEN } from '../../injection'
import { catchError, map, mergeMap, of, switchMap } from 'rxjs'
import { concatLatestFrom } from '@ngrx/operators'
import * as uuid from 'uuid'
import { Store } from '@ngrx/store'
import { selectTodoById } from './todos.selectors'

@Injectable()
export class TodoEffects {
  actions$ = inject(Actions)
  repository = inject(TODO_REPOSITORY_TOKEN)
  store = inject(Store)

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

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.updateTodo),
      concatLatestFrom(({ newTodo }) =>
        this.store.select(selectTodoById(newTodo.id))
      ),
      map(([{ newTodo }, oldTodo]) =>
        TodosActions.updateTodoRunning({ newTodo, oldTodo: oldTodo! })
      )
    )
  )

  updateTodoRunning$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.updateTodoRunning),
      switchMap(({ newTodo, oldTodo }) =>
        this.repository.updateTodo(newTodo).pipe(
          map(() => TodosActions.updateTodoSuccess()),
          catchError((error: Error) =>
            of(
              TodosActions.updateTodoFailure({
                error: JSON.stringify(error),
                oldTodo,
              })
            )
          )
        )
      )
    )
  )

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.deleteTodo),
      concatLatestFrom(({ todo }) =>
        this.store.select(selectTodoById(todo.id))
      ),
      map(([_, todo]) => TodosActions.deleteTodoRunning({ todo: todo! }))
    )
  )

  deleteTodoRunning$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.deleteTodoRunning),
      switchMap(({ todo }) =>
        this.repository.deleteTodo(todo.id).pipe(
          map(() => TodosActions.deleteTodoSuccess()),
          catchError((error: Error) =>
            of(
              TodosActions.deleteTodoFailure({
                error: JSON.stringify(error),
                todo,
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
