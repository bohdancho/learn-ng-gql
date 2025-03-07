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
    'create Todo Success': props<{ todo: TodoModel }>(),
    'create Todo Failure': props<{ error: string; id: string }>(),
    'delete Todo': props<{ todo: TodoModel }>(),
    'delete Todo Running': props<{ todo: TodoModel }>(),
    'delete Todo Success': props<{ id: string }>(),
    'delete Todo Failure': props<{ error: string; todo: TodoModel }>(),
    'update Todo': props<{ newTodo: TodoModel }>(),
    'update Todo Running': props<{ newTodo: TodoModel; oldTodo: TodoModel }>(),
    'update Todo Success': props<{ todo: TodoModel }>(),
    'update Todo Failure': props<{ error: string; oldTodo: TodoModel }>(),
  },
})
