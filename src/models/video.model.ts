import mongoose, { Schema, Types } from "mongoose";

interface IVideo {
  videoFile: string;
  thumbnail: string;
  owner: Types.ObjectId;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
}

const videoSchema = new Schema<IVideo>({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Please provide a duration"],
  },
  views: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  videoFile: {
    type: String,
    required: [true, "Please provide a video file"],
  },

  thumbnail: {
    // cloudinary url
    public_id: String,
    url: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Video = mongoose.model<IVideo>("Video", videoSchema);
export default Video;
