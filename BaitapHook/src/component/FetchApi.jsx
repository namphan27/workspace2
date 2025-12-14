import { useEffect, useState } from "react";
import { instance } from "../ultis/axios";

export default function FetchApi() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [postDetail, setPostDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await instance.get("/posts");
        setPosts(res.data.posts);
      } catch (err) {
        setError("Không thể tải danh sách bài viết");
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  const handleDetail = async (id) => {
    try {
      setShowModal(true);
      setPostDetail(null); 
      const res = await instance.get(`/posts/${id}`);
      setPostDetail(res.data);
    } catch {
      setPostDetail({ error: true });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
        <input
            type="text"
            class="js-search w-full border border-gray-400 outline-none px-3 py-2 mb-3"
            placeholder="Search..."
        />
      <h1 className="text-3xl font-bold mb-6 text-center">Posts</h1>

      {loading && (
        <p className="text-center text-xl font-medium">Loading...</p>
      )}

      {error && (
        <p className="text-center text-red-600 text-xl">{error}</p>
      )}

      {!loading && !error && (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-400 p-3 mb-3"
            >
              <h2 className="text-2xl font-medium mb-3">{post.title}</h2>
              <p>{post.body}</p>
              <div className="flex mt-2 justify-between items-center">
                <button
                onClick={() => handleDetail(post.id)}
                className="border border-gray-400 px-4 py-2 rounded-full hover:bg-green-600 hover:text-white transition"
              >
                Chi tiết
              </button>

              <div class="flex gap-2">
                <span class="js-edit cursor-pointer text-blue-600 hover:underline">Sửa</span>
                <span class="js-delete cursor-pointer text-red-600 hover:underline">Xóa</span>
            </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-10">
          <div className="bg-white w-[70%] max-w-2xl p-6 rounded-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>

            {!postDetail ? (
              <p className="text-center text-lg">Loading...</p>
            ) : postDetail.error ? (
              <p className="text-center text-red-600">
                Không thể tải chi tiết bài viết
              </p>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-3">
                  {postDetail.title}
                </h3>
                <p className="text-gray-700">{postDetail.body}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}