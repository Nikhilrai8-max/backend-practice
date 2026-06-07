import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,  // cloudinary url of the image
         default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png",
         required: true,
    },
    password: {
        type: String,
        required: true,
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    refreshToken: {
        type: String
    },  

    
   
}, { timestamps: true });
//we used pre save hook to hash the password before saving the user to the database and we used bcrypt to hash the password and we used 10 rounds to hash the password and we used async await to hash the password because hashing is a time consuming process and we want to avoid blocking the event loop while hashing the password and we used next() to move to the next middleware after hashing the password and we used isModified() method to check if the password is modified or not because if the password is not modified then we don't need to hash the password again and we can just move to the next middleware without hashing the password again.
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});
//we used method to compare the password with the hashed password in the database and we used bcrypt to compare the password and we used async await to compare the password because comparing is a time consuming process and we want to avoid blocking the event loop while comparing the password and we return true if the password is correct and false if the password is incorrect.
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);  // compare function takes the plain password and the hashed password and returns true if the password is correct and false if the password is incorrect
};
userSchema.methods.generateAccessToken = function () {
    // we used jwt to generate the access token and we used the user id as the payload of the token and we used the secret key from the environment variable to sign the token and we used the expiration time from the environment variable to set the expiration time of the token and we return the generated token.
    return jwt.sign(
        { userId: this._id }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION 

        });
}
userSchema.methods.generateRefreshToken = function () {
    // we used jwt to generate the refresh token and we used the user id as the payload of the token and we used the secret key from the environment variable to sign the token and we used the expiration time from the environment variable to set the expiration time of the token and we return the generated token.
    return jwt.sign(
        { userId: this._id }, 
        process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    );
}
export const User = mongoose.model("User", userSchema);

