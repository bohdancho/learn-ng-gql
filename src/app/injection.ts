import { InjectionToken } from '@angular/core'
import { ITodoRepository } from '@core/repository/todo.repository'

export const TODO_REPOSITORY_TOKEN = new InjectionToken<ITodoRepository>(
  'todo.repository'
)
