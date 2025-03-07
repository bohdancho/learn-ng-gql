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
    "query GetTodos {\n  todos {\n    id\n    text\n    done\n  }\n}\n\nmutation CreateTodo($todo: TodoInput!) {\n  createTodo(todo: $todo)\n}\n\nmutation DeleteTodo($id: String!) {\n  deleteTodo(id: $id)\n}\n\nmutation UpdateTodo($todo: TodoInput!) {\n  updateTodo(todo: $todo)\n}\n\nsubscription TodoCreated {\n  todoCreated {\n    id\n    text\n    done\n  }\n}\n\nsubscription TodoDeleted {\n  todoDeleted\n}\n\nsubscription TodoUpdated {\n  todoUpdated {\n    id\n    text\n    done\n  }\n}": typeof types.GetTodosDocument,
};
const documents: Documents = {
    "query GetTodos {\n  todos {\n    id\n    text\n    done\n  }\n}\n\nmutation CreateTodo($todo: TodoInput!) {\n  createTodo(todo: $todo)\n}\n\nmutation DeleteTodo($id: String!) {\n  deleteTodo(id: $id)\n}\n\nmutation UpdateTodo($todo: TodoInput!) {\n  updateTodo(todo: $todo)\n}\n\nsubscription TodoCreated {\n  todoCreated {\n    id\n    text\n    done\n  }\n}\n\nsubscription TodoDeleted {\n  todoDeleted\n}\n\nsubscription TodoUpdated {\n  todoUpdated {\n    id\n    text\n    done\n  }\n}": types.GetTodosDocument,
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
export function gql(source: "query GetTodos {\n  todos {\n    id\n    text\n    done\n  }\n}\n\nmutation CreateTodo($todo: TodoInput!) {\n  createTodo(todo: $todo)\n}\n\nmutation DeleteTodo($id: String!) {\n  deleteTodo(id: $id)\n}\n\nmutation UpdateTodo($todo: TodoInput!) {\n  updateTodo(todo: $todo)\n}\n\nsubscription TodoCreated {\n  todoCreated {\n    id\n    text\n    done\n  }\n}\n\nsubscription TodoDeleted {\n  todoDeleted\n}\n\nsubscription TodoUpdated {\n  todoUpdated {\n    id\n    text\n    done\n  }\n}"): (typeof documents)["query GetTodos {\n  todos {\n    id\n    text\n    done\n  }\n}\n\nmutation CreateTodo($todo: TodoInput!) {\n  createTodo(todo: $todo)\n}\n\nmutation DeleteTodo($id: String!) {\n  deleteTodo(id: $id)\n}\n\nmutation UpdateTodo($todo: TodoInput!) {\n  updateTodo(todo: $todo)\n}\n\nsubscription TodoCreated {\n  todoCreated {\n    id\n    text\n    done\n  }\n}\n\nsubscription TodoDeleted {\n  todoDeleted\n}\n\nsubscription TodoUpdated {\n  todoUpdated {\n    id\n    text\n    done\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;