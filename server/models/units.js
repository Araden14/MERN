import mongoose from "mongoose";


const UserUnitSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        name: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        hours: {
            type: Number,
            min: 1,
            max: 200,
        },
        description: {
            type: String,
            required: true,
            min: 2,
            max: 1000,
        },
        day : {
            type: String,
            min: 2,
            max: 100,
        },


    },);
    const Units = mongoose.model("Units", UserUnitSchema);
    export default Units;