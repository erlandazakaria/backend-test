export const userType = `
  union UserMessage = User | Message
  union TokenMessage = Token | Message

  type Token {
    accessToken: String
    refreshToken: String
  }

  type User {
    _id: String
    role: Int
    name: String
    email: String
    password: String
    status: Int
  }
`;

export const userQuery = `
  login(email: String!, password: String!): TokenMessage
  refreshToken(token: String!): Token
  updateToken: Token
`;
