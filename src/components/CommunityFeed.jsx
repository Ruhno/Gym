import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, User, Tag, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CommunityFeed() {
  const { user, communityPosts, addCommunityPost, likeCommunityPost } = useAuth();
  const [postContent, setPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Technique');

  const categories = ['General', 'Technique', 'Training Partners', 'Nutrition & Recovery'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    addCommunityPost(postContent, selectedCategory);
    setPostContent('');
  };

  return (
    <div className="space-y-6">
      {/* Create Post Box */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-extrabold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-red-500" />
          <span>DoBu Member Community Feed</span>
        </h3>

        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              rows="3"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder={`What's on your mind, ${user.name.split(' ')[0]}? Share training insights, technique questions, or sparring partner requests...`}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-semibold">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={!postContent.trim()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post to Community</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <p className="text-sm text-gray-400">Sign in to your member account to post and join discussions.</p>
          </div>
        )}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {communityPosts.map((post) => (
          <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4 hover:border-gray-700 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover border border-gray-700"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{post.author}</h4>
                  <span className="text-xs text-red-400 font-semibold">{post.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-800 text-gray-300 border border-gray-700">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.time}</span>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              {post.content}
            </p>

            <div className="pt-3 border-t border-gray-800/60 flex items-center gap-6 text-xs text-gray-400">
              <button
                onClick={() => likeCommunityPost(post.id)}
                className="flex items-center gap-2 hover:text-red-400 transition-colors"
              >
                <ThumbsUp className="w-4 h-4 text-red-500" />
                <span>{post.likes} Likes</span>
              </button>

              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <span>{post.comments} Comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
