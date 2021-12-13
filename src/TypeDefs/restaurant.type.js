export const restaurantType = `
  type OpeningStartEnd {
    start: String
    end: String
  }

  type Opening {
    Sunday: OpeningStartEnd
    Monday: OpeningStartEnd
    Tuesday: OpeningStartEnd
    Wednesday: OpeningStartEnd
    Thursday: OpeningStartEnd
    Friday: OpeningStartEnd
    Saturday: OpeningStartEnd
  }

  type Restaurant {
    _id: String
    name: String
    opening: Opening
  }
`;

export const restaurantQuery = `
  getAllRestaurant: [Restaurant]
`;
