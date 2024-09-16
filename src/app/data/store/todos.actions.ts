import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { TodoModel } from '@core/domain/todo/todo.model'

export const TodosActions = createActionGroup({
  source: 'UI',
  events: {
    'load Todos': emptyProps(),
    'load Todos Success': props<{ todos: TodoModel[] }>(),
    'load Todos Failure': props<{ error: string }>(),
    'create Todo': props<{ text: string }>(),
    'create Todo Running': props<{ todo: TodoModel }>(),
    'create Todo Success': emptyProps(),
    'create Todo Failure': props<{ error: string; id: string }>(),
    'delete Todo': props<{ id: string }>(),
    'delete Todo Running': props<{ id: string }>(),
    'delete Todo Success': emptyProps(),
    'delete Todo Failure': props<{ error: string; todo: TodoModel }>(),
    'update Todo': props<TodoModel>(),
    'update Todo Running': props<TodoModel>(),
    'update Todo Success': emptyProps(),
    'update Todo Failure': props<{ error: string; todo: TodoModel }>(),
  },
})
