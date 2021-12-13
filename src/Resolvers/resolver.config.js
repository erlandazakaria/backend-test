const resolverConfig = {
  TokenMessage: {
    __resolveType: (obj, context, info) => {
      if(obj.accessToken) {
        return 'Token';
      }

      if(obj.message) {
        return 'Message';
      }

      return null;
    }
  },
  UserMessage: {
    __resolveType: (obj, context, info) => {
      if(obj._id) {
        return 'User';
      }

      if(obj.message) {
        return 'Message';
      }

      return null;
    }
  },
  CollectionMessage: {
    __resolveType: (obj, context, info) => {
      if(obj._id) {
        return 'Collection';
      }

      if(obj.message) {
        return 'Message';
      }

      return null;
    }
  }
}

export default resolverConfig;
