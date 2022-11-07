import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  articleId: { type: String, required: true },
  content: { type: String, required: true },
  postedAt: String,
  score: Number,
});

export interface Comment {
  id: string;
  articleId: string;
  content: string;
  postedAt: string;
  score: number;
}
