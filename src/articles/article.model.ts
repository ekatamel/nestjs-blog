import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  perex: { type: String, required: true },
  content: { type: String, required: true },
  imageId: String,
  createdAt: String,
  lastUpdatedAt: String,
});

export interface Article extends mongoose.Document {
  id: string;
  title: string;
  perex: string;
  content: string;
  createdAt: string;
  lastUpdatedAt: string;
  imageId: string;
}
