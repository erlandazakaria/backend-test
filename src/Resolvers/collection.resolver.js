import mongoose from "mongoose";
import CollectionModel from "../Models/collection.model";
import { checkAuth } from "../Utils/auth";

// QUERY
export const getCollections = async (root, args, { auth }, info) => {
  try {
    const isAuthed = checkAuth(auth, "user");
    if(!isAuthed) { return { message: "Restricted Area!" }; }

    const collectionData = await CollectionModel.find({user: auth._id}).populate("restaurants").exec();

    return collectionData;
  } catch(err) {
    console.log(err);
    return { message: "Error Occurred!" };
  }
};

// Mutation
export const newCollection = async (root, args, { auth }, info) => {
  try {
    const isAuthed = checkAuth(auth, "user");
    if(!isAuthed) { return { message: "Restricted Area!" }; }

    const { name, id_restaurant } = args;
    let message = "";

    const fields = { name, restaurants: [], user: auth._id };
    if(id_restaurant) {
      fields.restaurants.push(id_restaurant);
    }

    const newC = new CollectionModel(fields);
    await newC.save()
      .then(() => { message= "Collection Added"; })
      .catch(() => { message = "Error Occurred!"; })
    return { message };
  } catch(err) {
    console.log(err);
    return { message: "Error Occurred!" };
  }
};

export const addToCollection = async (root, args, { auth }, info) => {
  try {
    const isAuthed = checkAuth(auth, "user");
    if(!isAuthed) { return { message: "Restricted Area!" }; }

    const { id_collection, id_restaurant } = args;
    let message = "";

    const collectionData = await CollectionModel.findOne({id_collection}).exec();
    if(!collectionData) {
      return { message: "Collection does not exist" };
    }

    if(collectionData.restaurants.includes(id_restaurant)) {
      return { message: "This restaurant already in the Collection" };
    }

    const editFields = { restaurants: [...collectionData.restaurants, id_restaurant] };

    await CollectionModel.updateOne({_id: id_collection}, editFields)
      .then(() => { message= "Restaurant added to collection"; })
      .catch(() => { message = "Error Occurred!"; })
    return { message };
  } catch(err) {
    console.log(err);
    return { message: "Error Occurred!" };
  }
};

export const deleteFromCollection = async (root, args, { auth }, info) => {
  try {
    const isAuthed = checkAuth(auth, "user");
    if(!isAuthed) { return { message: "Restricted Area!" }; }

    const { id_collection, id_restaurant } = args;
    let message = "";

    const collectionData = await CollectionModel.findOne({id_collection}).exec();
    if(!collectionData) {
      return { message: "Collection does not exist" };
    }
    const editFields = { restaurants: collectionData.restaurants.filter(id => id.toString() !== id_restaurant)};

    await CollectionModel.updateOne({_id: id_collection}, editFields)
      .then(() => { message= "Restaurant deleted from collection"; })
      .catch(() => { message = "Error Occurred!"; })
    return { message };
  } catch(err) {
    console.log(err);
    return { message: "Error Occurred!" };
  }
};

export const renameCollection = async (root, args, { auth }, info) => {
  try {
    const isAuthed = checkAuth(auth, "user");
    if(!isAuthed) { return { message: "Restricted Area!" }; }

    const { id_collection, name } = args;
    let message = "";

    const collectionData = await CollectionModel.find({id_collection}).exec();
    if(!collectionData) {
      return { message: "Collection does not exist" };
    }

    const editFields = { name };

    await CollectionModel.updateOne({_id: id_collection}, editFields)
      .then(() => { message= "Collection Renamed"; })
      .catch(() => { message = "Error Occurred!"; })
    return { message };
  } catch(err) {
    console.log(err);
    return { message: "Error Occurred!" };
  }
};

export const deleteCollection = async (root, args, { auth }, info) => {
  try {
    const isAuthed = checkAuth(auth, "user");
    if(!isAuthed) { return { message: "Restricted Area!" }; }

    const { id_collection } = args;
    let message = "";
  
    await CollectionModel.findByIdAndDelete(id_collection)
      .then(() => { message= "Collection Deleted"; })
      .catch(() => { message = "Error Occurred!"; })
    return { message };
  } catch(err) {
    console.log(err);
    return { message: "Error Occurred!" };
  }
};
