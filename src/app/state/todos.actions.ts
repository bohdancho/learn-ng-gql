import { createActionGroup, props } from '@ngrx/store'
import { Todo } from '../../../shared/todo.model'

export const TodosActions = createActionGroup({
  source: 'UI',
  events: {
    'Add Todo': props<Todo>(),
    'Remove Todo': props<Pick<Todo, 'id'>>(),
    'Set Todo Done': props<Pick<Todo, 'id' | 'done'>>(),
  },
})

export const TodosApiActions = createActionGroup({
  source: 'Todos API',
  events: {
    'Retrieved Todos List': props<{ todos: Todo[] }>(),
  },
})
