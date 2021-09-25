import { gql } from "apollo-server";

export const typeDefs = gql`
  type Gradient {
    _id: ID!
    name: String!
    colors: [String!]
    direction: String!
    stops: [String!]
    tags: [String!]
  }

  input GradientInput {
    name: String!
    colors: [String!]
    direction: String!
    stops: [String!]
    tags: [String!]
  }

  input GetGradientsInput {
    cursor: String
    tags: [String]
    limit: Int!
  }

  type CreateGradientResponse {
    completed: Boolean
    error: String
  }

  type GetGradientsReturn {
    results: [Gradient]
    next: String
  }

  type Query {
    getGradients(input: GetGradientsInput): GetGradientsReturn
  }

  type Mutation {
    createGradient(input: GradientInput): CreateGradientResponse
  }
`;
