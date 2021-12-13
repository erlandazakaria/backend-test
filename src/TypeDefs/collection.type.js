export const collectionType = `
  union CollectionMessage = Collection | Message

  type Collection {
    _id: String
    user: User
    name: String
    restaurants: [Restaurant]
  }
`;

export const collectionQuery = `
  getCollections: [Collection]
`;

export const collectionMutation = `
  newCollection(name: String!, id_restaurant: String): Message
  addToCollection(id_collection: String!, id_restaurant: String!): Message
  deleteFromCollection(id_collection: String!, id_restaurant: String!): Message
  renameCollection(id_collection: String!, name: String!): Message
  deleteCollection(id_collection: String!): Message
`;
