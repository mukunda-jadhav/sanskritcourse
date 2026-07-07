'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { formatDate } from '@/lib/utils';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    axios.get(`/api/blog/${slug}`).then(r => setBlog(r.data));
  }, [slug]);

  if (!blog) return <div className="pt-24 text-center text-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">{blog.category}</span>
          <h1 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-3">{blog.title}</h1>
          <p className="text-sm text-gray-400">{blog.author} • {formatDate(blog.createdAt)}</p>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {blog.content}
        </div>
      </div>
    </div>
  );
}