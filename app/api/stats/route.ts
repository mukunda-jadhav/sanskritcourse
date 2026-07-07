import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/User';
import CourseModel from '@/models/Course';
import ProgressModel from '@/models/Progress';
import NoteModel from '@/models/Note';

export async function GET() {
  await dbConnect();
  const [students, courses, enrollments, notes] = await Promise.all([
    UserModel.countDocuments({ role: 'student' }),
    CourseModel.countDocuments({ isPublished: true }),
    ProgressModel.countDocuments(),
    NoteModel.aggregate([{ $group: { _id: null, total: { $sum: '$downloads' } } }]),
  ]);
  return NextResponse.json({
    students,
    courses,
    enrollments,
    downloads: notes[0]?.total || 0,
  });
}