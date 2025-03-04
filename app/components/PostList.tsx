import Link from 'next/link';
import { format } from 'date-fns';
import type { PostData } from '../lib/markdown';

interface PostListProps {
  posts: PostData[];
}

export default function PostList({ posts }: PostListProps) {
  const getFirstParagraph = (content: string) => {
    // 移除frontmatter部分
    const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---/, '').trim();
    // 获取第一个非空段落
    const firstParagraph = contentWithoutFrontmatter
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))[0] || '';
    return firstParagraph;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="group transform cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-1 transition-transform duration-300 hover:scale-105">
            <div className="relative h-full rounded-xl bg-white p-6">
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-500">
                  {format(new Date(post.date), 'yyyy年MM月dd日')}
                </span>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600">
                  {post.title}
                </h3>
                <p className="line-clamp-3 text-gray-600">
                  {getFirstParagraph(post.content)}
                </p>
                <div className="pt-4">
                  <span className="inline-flex items-center text-sm font-medium text-purple-600">
                    阅读更多
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 