import mongoose, { Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
interface IUser {
  userName: string;
  email: string;
  avatar?: string;
  fullName: string;
  coverImage?: string;
  password: string;
  watchHistory?: Types.ObjectId[];
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
    unique: true,
    required: [true, "Please provide a username"],
    lowercase: true,
    index: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an email"],
    lowercase: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: [true, "Please provide a full name"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
  },
  coverImage: {
    // cloudinary url
    public_id: String,
    url: String,
  },
  watchHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],

  avatar: {
    // cloudinary url
    public_id: String,
    url: String,
    required: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

// Hashing password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Compare Password
userSchema.methods.IsPasswordCorrect = async function IsPasswordCorrect(
  password: string
) {
  return await bcrypt.compare(password, this.password);
};

//Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET!
  );
};

//Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY!,
    }
  );
};

export default User;
