export const typeDefs = `

input CreateTodo {
    title: String!
    description: String!
}
input UpdateTodo {
    title: String
    description: String
    completed: Boolean
    isDeleted: Boolean
}  
type ReturnTodo {
    id: ID!
    title: String!
    description: String
    completed: String
    createdAt: String
}
type Todo {
    id: ID!
    title: String!
    description: String
    completed: String
    createdAt: String
}
type Query {
    todos: [ReturnTodo]
    todo(id: ID!): ReturnTodo
}
type Mutation {
    createTodo(createInput: CreateTodo): ReturnTodo
    updateTodo(id: ID!, updateInput: UpdateTodo): ReturnTodo
    deleteTodo(id: ID!): null
}`;
