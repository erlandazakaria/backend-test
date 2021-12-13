import resolverConfig from "./resolver.config";
import { login, refreshToken, updateToken } from "./user.resolver";
import { getAllRestaurant } from "./restaurant.resolver";
import { getCollections, newCollection, addToCollection, deleteFromCollection, renameCollection, deleteCollection } from "./collection.resolver";

const rootResolver = {
  ...resolverConfig,
  Query: {
    // USERS
    login,
    refreshToken,
    updateToken,
    // RESTAURANT
    getAllRestaurant,
    // COLLECTION
    getCollections,
  },
  Mutation: {
    // COLLECTION
    newCollection,
    addToCollection,
    deleteFromCollection,
    renameCollection,
    deleteCollection
  }
};

export default rootResolver;
