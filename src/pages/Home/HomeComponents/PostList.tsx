/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePosts } from "@/api/post";
import Loader from "@/components/common/Loader";
import type { TPost } from "@/type/dataType";

const PostList = () => {
  const { data, isLoading } = usePosts();

  console.log(data?.data?.data);

  if (isLoading) <Loader />;

  const posts = data?.data?.data;
  return (
  <div className="space-y-5">
      {posts?.map((post: TPost) => (
        <div key={post.id} className="bg-white p-5 rounded-lg">
            
          <div className="mt-4 flex items-center gap-3 mb-5">
            {post.user.image ? (
              <img
                src={post.user.image}
                alt={post.user.fullName}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
                {post.user.fullName[0].toUpperCase()}
              </div>
            )}
            <p className="text-lg font-medium">{post.user.fullName}</p>
          </div>

          <p className="">{post.description}</p>

          {post.image && (
            <img
              src={post.image}
              alt="Post image"
              className="mt-3 rounded-lg w-full object-cover"
            />
          )}


          <div className="flex gap-4 mt-3 text-sm text-gray-500">
            <span>👍 {post.likeCount}</span>
            <span>👎 {post.dislikeCount}</span>
            <span>💬 {post.commentCount}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
