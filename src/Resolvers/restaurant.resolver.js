import RestaurantModel from "../Models/restaurant.model";
import { checkAuth } from "../Utils/auth";

// QUERY
export const getAllRestaurant = async (root, args, { auth }, info) => {
  try {
    const isAuthed = checkAuth(auth, "user");
    if(!isAuthed) { return [] }
    
    const restaurantData = await RestaurantModel.find().exec();
    return restaurantData;
  } catch(err) {
    console.log(err);
    return [];
  }
};
