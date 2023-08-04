import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        city: String,
        school: String,
        country: String,

        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            default: "user",
        },
    },
    { timestamps: true }
);
UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});
const User = mongoose.model("User", UserSchema);
export default User;