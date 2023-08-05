import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import dashboardRoutes from "./routes/dashboard.js";
import unitsRoutes from "./routes/units.js";
import calendarRoutes from "./routes/calendar.js";
import tasksRoutes from "./routes/tasks.js";
import filesRoutes from "./routes/files.js";
import marksRoutes from "./routes/marks.js";
import authRoute from "./routes/AuthRoute.js";
import CookieParser from "cookie-parser";


// data import
import User from "./models/user.js";
import Units from "./models/units.js";
import Datagen from "./data/index.js";

/*CONFIGURATION*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: 'https://mern-six-sooty.vercel.app', // Corrected URL
  credentials: true
}));
app.use(CookieParser());

/*ROUTES*/
app.use("/dashboard", dashboardRoutes);
app.use("/units", unitsRoutes);
app.use("/calendar", calendarRoutes);
app.use("/tasks", tasksRoutes);
app.use("/files", filesRoutes);
app.use("/marks", marksRoutes);
app.use("/auth", authRoute);

/*MONGOOSE SETUP*/
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
      
    })
    .catch((error) => console.log(`${error} did not connect !`));
    

    app.get('/', (req, res) => {
      res.send('Hello to API')
      });
      
      
