const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
  }

  type Claim {
  _id: ID!
  userId: ID!
  fullName: String!
  dateOfBirth: String!
  dateOfService: String!
  claimType: String!
  description: String!
  status: String!
  claimNumber: String!
}

  type AuthPayload {
    token: String!
    user: User!
  }

type Query {
  me: User
  getClaimsByUser: [Claim] 
}

type Mutation {
  register(username: String!, email: String!, password: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload
  createClaim(
    fullName: String!
    dateOfBirth: String!
    dateOfService: String!
    claimType: String!
    description: String!
  ): Claim
}
`;
export default typeDefs;
