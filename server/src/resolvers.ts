import { GraphQLError } from 'graphql'
import { Todo } from './../../shared/todo.model'
let todos: Todo[] = [
  { text: 'first todo', done: false, id: -2 },
  { text: 'second todo', done: true, id: -1 },
]
let nextId = 0

export const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    addTodo(_: unknown, args: { text: string }): Todo {
      const todo = { text: args.text, id: nextId++, done: false }
      todos.push(todo)
      return todo
    },
    removeTodo(_: unknown, args: { id: number }): boolean {
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
    setTodoDone(_: unknown, args: { id: number; done: boolean }): Todo {
      let foundTodo: Todo | undefined = undefined
      todos = todos.map((todo) => {
        if (todo.id !== args.id) return todo
        foundTodo = { ...todo, done: args.done }
        return foundTodo
      })

      if (!foundTodo) {
        throw new GraphQLError('Todo not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      return foundTodo
    },
  },
}
