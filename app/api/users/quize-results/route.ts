import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import mongoose, { Schema } from 'mongoose';

const QuizResultSchema = new Schema({ userId: String, quizId: { type: Schema.Types.ObjectId, ref: 'Quiz' }, score: Number, total: Number, passed: Boolean }, { timestamps: true });
const QuizResult = mongoose.models.QuizResult || mongoose.model('QuizResult', QuizResultSchema);

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json([]);
  await dbConnect();
  const results = await QuizResult.find({ userId: (session.user as any).id }).populate('quizId').sort({ createdAt: -1 }).lean();
  return NextResponse.json(results);
}