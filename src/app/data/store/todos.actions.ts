import { createActionGroup, props } from '@ngrx/store'
import { Todo } from '../../../../shared/todo.model'
import { TodoModel } from '@core/domain/todo/todo.model'

export const TodosActions = createActionGroup({
  source: 'UI',
  events: {
    addTodo: props<Todo>(),
    addTodoSuccess: props<TodoModel>(),
    addTodoError: props<TodoModel>(),

    'Remove Todo': props<Pick<Todo, 'id'>>(),
    'Set Todo Done': props<Pick<Todo, 'id' | 'done'>>(),
  },
})

export const TodosApiActions = createActionGroup({
  source: 'Todos API',
  events: {
    retrievedTodoList: props<{ data: Todo[] }>(),
  },
})
