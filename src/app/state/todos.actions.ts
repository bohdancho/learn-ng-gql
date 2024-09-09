import { createActionGroup, props } from '@ngrx/store'
import { Todo } from '../todo-list/todo.model'

export const todosActions = createActionGroup({
  source: 'UI',
  events: {
    'Add Todo': props<Pick<Todo, 'text'>>(),
    'Remove Todo': props<Pick<Todo, 'id'>>(),
    'Set Done': props<Pick<Todo, 'id' | 'done'>>(),
  },
})
