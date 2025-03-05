import { format } from 'date-fns';
import { getAllPostIds, getPostData } from '../../lib/markdown';
import Link from 'next/link';

type PostParams = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<any>;
}

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function Post({ params }: PostParams) {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.id);

  return (
    <article className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-purple-600 hover:text-purple-700"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回首页
          </Link>
          <div className="overflow-hidden rounded-xl bg-white p-8 shadow-lg">
            <div className="mb-8">
              <h1 className="mb-4 text-4xl font-bold text-gray-900">
                {post.title}
              </h1>
              <time className="text-gray-600">
                {format(new Date(post.date), 'yyyy-MM-dd')}
              </time>
            </div>
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-purple-600"
              dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
            />
          </div>
        </div>
      </div>
    </article>
  );
} 