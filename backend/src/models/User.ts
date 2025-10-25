import mongoose, { Document, type ObjectId, Schema } from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

// 1️⃣ Nested interface for details
interface IUserDetails {
  bio?: string;
  otherName?: string;
  workplace?: string;
  highSchool?: string;
  college?: string;
  currentCity?: string;
  hometown?: string;
  relationship?: "Single" | "In a relationship" | "Married" | "Divorced";
  instagram?: string;
}

// 2️⃣ Interface for saved posts
interface ISavedPost {
  post: ObjectId;
  savedAt: Date;
}

// 3️⃣ Main User interface
export interface IUser extends Document {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  picture: string;
  cover?: string;
  gender: string;
  bYear: number;
  bMonth: number;
  bDay: number;
  verified: boolean;
  friends: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  followers: mongoose.Types.ObjectId[];
  requests: mongoose.Types.ObjectId[];
  search: { user: mongoose.Types.ObjectId }[];
  details: IUserDetails;
  savedPosts: ISavedPost[];
  createdAt?: Date;
  updatedAt?: Date;
}

// 4️⃣ Schema definition
const userSchema: Schema<IUser> = new mongoose.Schema<IUser>(
  {
    first_name: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      text: true,
      unique: true,
    },
    last_name: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    picture: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
      trim: true,
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: [ObjectId],
      ref: "User",
      default: [],
    },
    following: {
      type: [ObjectId],
      ref: "User",
      default: [],
    },
    followers: {
      type: [ObjectId],
      ref: "User",
      default: [],
    },
    requests: {
      type: [ObjectId],
      ref: "User",
      default: [],
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      bio: String,
      otherName: String,
      workplace: String,
      highSchool: String,
      college: String,
      currentCity: String,
      hometown: String,
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
      instagram: String,
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.set("autoIndex", true);

// 5️⃣ Model export
const User = mongoose.model<IUser>("User", userSchema);
export default User;
