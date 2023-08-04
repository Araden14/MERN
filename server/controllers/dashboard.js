// Importing express and User model from "../models/user" file
import express from "express";
import User from "../models/user.js";


// Defining getUsers function that has access to request and response objects.
export const getUsers = async (req, res) => {
    try {
        // Extracting 'id' from request parameters destructuring method.
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        // Responding with error message if there is any error.
        res.status(404).json({ message: error.message });
    }
}
export const getUser = async (req, res) => {
    try {
        // Extracting 'id' from request parameters destructuring method.
        const { id } = req.params; // Stores the url parameter in 'id' variable.    
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        // Responding with error message if there is any error.
        res.status(404).json({ message: error.message });
    }
}
export const getUserCountry = async (req, res) => {
    try {
        // Extracting 'id' from request parameters destructuring method.
        const country  = req.params.country; // Stores the url parameter in 'country' variable. 
        const user = await User.find({ country: country });
        res.status(200).json(user);
    } catch (error) {
        // Responding with error message if there is any error.
        res.status(404).json({ message: error.message });
    }
}


// Creating a router instance using express.Router() method.
const router = express.Router();

// Exporting the router so that it can be used in other files.
export default router;
