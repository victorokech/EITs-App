import { gql } from "apollo-server-express";

const typeDefs = gql`
    scalar Date
    type Query {
        getEits: [Eits]
        getOneEit(id: String!): Eits
    }
    type Mutation {
        insertEit(firstname: String!, lastname: String!, gender: String!, dob: String!, owner: String!, username: String!): Eits
        deleteEit(id: String!): String
        updateEit(id: String!, firstname: String!, lastname: String!, gender: String!, dob: String!): Eits
    }
    type Eits {
        _id: String
        firstname: String
        lastname: String
        gender: String
        dob: String
        owner: String
        username: String
    }
`;

export default typeDefs