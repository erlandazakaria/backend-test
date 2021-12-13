const { gql } = require("apollo-server");
import { userType, userQuery } from "./user.type";
import { restaurantType, restaurantQuery } from "./restaurant.type";
import { collectionType, collectionQuery, collectionMutation } from "./collection.type";

const rootType = gql`
  type Message {
    message: String
  }

  ${userType}
  ${restaurantType}
  ${collectionType}

  type Query {
    ${userQuery}
    ${restaurantQuery}
    ${collectionQuery}
  }

  type Mutation {
    ${collectionMutation}
  }
`;

export default rootType;
