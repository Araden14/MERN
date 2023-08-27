import express from "express";
import Units from "../models/units.js";
import { mongo } from "mongoose";

const router = express.Router();

const Createunit = async (req, res) => {
    try {
      // Destructurer le corps de la requête pour obtenir email, password, username, createdAt
      const { user, name, hours, description, day } = req.body;
  
      // Vérifier si un utilisateur avec l'email donné existe déjà
     const existingUnit = await Units.findOne({ user, name });
  
  
  
      // Si l'utilisateur existe, retourner un message
      if (existingUnit) {
        return res.json({ message: "Ce cours existe déjà" });
      }
  
  
  
      const Unit = await Units.create({  user, name, hours, description, day });
  
      // Envoyer une réponse de succès avec les détails de l'utilisateur
     res.status(201).json({ message: "Cours crée avec succès", success: true, name });
  ;}
    
     catch (error) {
      // Log any errors
      console.error(error);
    }
  };

  const getUnits = async (req, res) => {
    try {
      const userid = req.cookies.user;
      const units = await Units.find({ user: userid });
      res.status(200).json(units);

    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  const RemoveUnit = async (req, res) => {
    try {
const { _id , user, name} = req.body;
const statuscheck = Object.keys(req.body).length
if ( statuscheck === 0){
  return res.json({ message: "Requête vide"});

}
if (req.cookies.user !== user){
  return res.json({ message: "Utilisateur non autorisé"});
}

const deleteUnit = await Units.deleteOne({ _id, user})
if (deleteUnit.deletedCount > 0 ){
res.status(201).json({ message: "Cours supprimé avec succès", success: true, name });
}
else {
  res.status(201).json({ message: "Requête invalide", success: false });
}

    }
    catch(error){
      res.status(404).json({ message: error.message });
    }
  };

export { Createunit, getUnits, RemoveUnit };