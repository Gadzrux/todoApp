import mongoose from "mongoose";
import { boolean } from "zod";

const URL = process.env.DB_URL;
mongoose.connect(URL);

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
