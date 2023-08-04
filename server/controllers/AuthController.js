// Importer le modèle User
import User from "../models/user.js";
// Importer la fonction createSecretToken de l'utilitaire SecretToken
import createSecretToken from "../util/SecretToken.js";
// Importer la bibliothèque bcryptjs pour le hachage des mots de passe
import bcrypt from "bcryptjs";



const Login = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    if(!name || !password ){
      return res.json({message:'Tous les champs sont obligatoires'})
    }
    const user = await User.findOne({ name });
    if(!user){
      return res.json({message:'Nom ou mot de passe incorrect' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Nom ou mot de passe incorrect' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.cookie("user", user._id.toString(), {
      withCredentials: true,
      httpOnly: false,
    });
     res.status(201).json({ message: "Utilisateur connecté avec succès", success: true });
     next()
  } catch (error) {
    console.error(error);
  }
}

const Signup = async (req, res, next) => {
  try {
    // Destructurer le corps de la requête pour obtenir email, password, username, createdAt
    const { email, password, name, city, school, country, createdAt } = req.body;

    // Vérifier si un utilisateur avec l'email donné existe déjà
    const existingEmail = await User.findOne({ email });
    const existingName = await User.findOne({ name });



    // Si l'utilisateur existe, retourner un message
    if (existingEmail) {
      return res.json({ message: "L'email existe déjà" });
    }
    if (existingName) {
        return res.json({ message: "Le nom d'utilisateur est déjà pris" });
      }

    // Si l'utilisateur n'existe pas, créer un nouvel utilisateur avec les détails donnés
    const user = await User.create({ email, password, name, city, school, country, createdAt });

    // Créer un token secret pour l'utilisateur
    const token = createSecretToken(user._id);

    // Définir un cookie avec le token
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false
    
    });
    res.cookie("user", user._id.toString(), {
      withCredentials: true,
      httpOnly: false,
    });
    // Envoyer une réponse de succès avec les détails de l'utilisateur
    res
      .status(201)
      .json({ message: "Utilisateur inscrit avec succès", success: true, user });

    // Appeler le middleware suivant
    next();
  } catch (error) {
    // Log any errors
    console.error(error);
  }
};

export { Signup, Login };
