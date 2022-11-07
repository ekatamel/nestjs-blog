import * as mongoose from 'mongoose';

export const ImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export interface Image {
  id: string;
  name: string;
}
