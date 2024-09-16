import { TodoModel } from './../../src/app/core/domain/todo/todo.model'
import { GraphQLError } from 'graphql'

async function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

let todos: TodoModel[] = [
  { text: 'first todo', done: false, id: '11' },
  { text: 'second todo', done: true, id: '22' },
]

export const resolvers = {
  Query: {
    todos: async () => {
      await wait(500)
      return todos
    },
  },
  Mutation: {
    createTodo(_: unknown, args: { todo: TodoModel }): boolean {
      todos.push(args.todo)
      return true
    },
    deleteTodo(_: unknown, args: { id: string }): boolean {
      let found = false
      todos = todos.filter((todo) => {
        if (todo.id === args.id) {
          found = true
          return false
        }
        return true
      })

      if (!found) {
        throw new GraphQLError('Todo not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      return true
    },
    updateTodo(_: unknown, args: { todo: TodoModel }): boolean {
      let found = false
      todos = todos.map((todo) => {
        if (todo.id !== args.todo.id) return todo
        found = true
        return args.todo
      })

      if (!found) {
        throw new GraphQLError('Todo not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      return true
    },
  },
}
