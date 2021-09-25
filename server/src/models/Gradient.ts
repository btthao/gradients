import mongoose from "mongoose";
import { Gradient } from "../utils/types";
import uniqueValidator from "mongoose-unique-validator";

const gradientSchema = new mongoose.Schema<Gradient>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  colors: {
    type: [String],
    unique: true,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  stops: {
    type: [String],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
});

gradientSchema.plugin(uniqueValidator);

export const GradientModel = mongoose.model<Gradient>(
  "gradients",
  gradientSchema
);
