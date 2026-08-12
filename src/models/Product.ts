import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  condition: string;
  description: string;
  seller: string;
  location: string;
  image: string;
  gallery: string[];
  details: {
    material: string;
    dimensions: string;
    era: string;
  };
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    seller: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    gallery: [
      {
        type: String,
      },
    ],

    details: {
      material: {
        type: String,
      },

      dimensions: {
        type: String,
      },

      era: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>(
    "Product",
    ProductSchema
  );