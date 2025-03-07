/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetTodos {\n    todos {\n      id\n      text\n      done\n    }\n  }\n": typeof types.GetTodosDocument,
    "\n  mutation CreateTodo($todo: TodoInput!) {\n    createTodo(todo: $todo)\n  }\n": typeof types.CreateTodoDocument,
    "\n  mutation DeleteTodo($id: String!) {\n    deleteTodo(id: $id)\n  }\n": typeof types.DeleteTodoDocument,
    "\n  mutation UpdateTodo($todo: TodoInput!) {\n    updateTodo(todo: $todo)\n  }\n": typeof types.UpdateTodoDocument,
    "\n  subscription TodoCreated {\n    todoCreated {\n      id\n      text\n      done\n    }\n  }\n": typeof types.TodoCreatedDocument,
    "\n  subscription TodoDeleted {\n    todoDeleted\n  }\n": typeof types.TodoDeletedDocument,
    "\n  subscription TodoUpdated {\n    todoUpdated {\n      id\n      text\n      done\n    }\n  }\n": typeof types.TodoUpdatedDocument,
};
const documents: Documents = {
    "\n  query GetTodos {\n    todos {\n      id\n      text\n      done\n    }\n  }\n": types.GetTodosDocument,
    "\n  mutation CreateTodo($todo: TodoInput!) {\n    createTodo(todo: $todo)\n  }\n": types.CreateTodoDocument,
    "\n  mutation DeleteTodo($id: String!) {\n    deleteTodo(id: $id)\n  }\n": types.DeleteTodoDocument,
    "\n  mutation UpdateTodo($todo: TodoInput!) {\n    updateTodo(todo: $todo)\n  }\n": types.UpdateTodoDocument,
    "\n  subscription TodoCreated {\n    todoCreated {\n      id\n      text\n      done\n    }\n  }\n": types.TodoCreatedDocument,
    "\n  subscription TodoDeleted {\n    todoDeleted\n  }\n": types.TodoDeletedDocument,
    "\n  subscription TodoUpdated {\n    todoUpdated {\n      id\n      text\n      done\n    }\n  }\n": types.TodoUpdatedDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTodos {\n    todos {\n      id\n      text\n      done\n    }\n  }\n"): (typeof documents)["\n  query GetTodos {\n    todos {\n      id\n      text\n      done\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateTodo($todo: TodoInput!) {\n    createTodo(todo: $todo)\n  }\n"): (typeof documents)["\n  mutation CreateTodo($todo: TodoInput!) {\n    createTodo(todo: $todo)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteTodo($id: String!) {\n    deleteTodo(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteTodo($id: String!) {\n    deleteTodo(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateTodo($todo: TodoInput!) {\n    updateTodo(todo: $todo)\n  }\n"): (typeof documents)["\n  mutation UpdateTodo($todo: TodoInput!) {\n    updateTodo(todo: $todo)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription TodoCreated {\n    todoCreated {\n      id\n      text\n      done\n    }\n  }\n"): (typeof documents)["\n  subscription TodoCreated {\n    todoCreated {\n      id\n      text\n      done\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription TodoDeleted {\n    todoDeleted\n  }\n"): (typeof documents)["\n  subscription TodoDeleted {\n    todoDeleted\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription TodoUpdated {\n    todoUpdated {\n      id\n      text\n      done\n    }\n  }\n"): (typeof documents)["\n  subscription TodoUpdated {\n    todoUpdated {\n      id\n      text\n      done\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;