import Profile from './components/Profile';
import PostList from './components/PostList';
import { getSortedPostsData } from './lib/markdown';

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-2xl mx-auto">
          <Profile />
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            我的服务
          </h2>
          <PostList posts={posts} />
        </div>
      </div>
    </main>
  );
}
