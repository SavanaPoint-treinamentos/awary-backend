import { Schema, model } from "mongoose";

const SchemaUser = new Schema(
  {
    id: {
        type: String,
        unique: true,
        required: false,
      },

    displayName: {
      firstName: {
        type: String,
        required: false,
        min: 4,
      },

      lastName: {
        type: String,
        required: false,
        min: 4,
      },
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      min: 6,
    },

    bornDay: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    photoprofile: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const user = model("user", SchemaUser);