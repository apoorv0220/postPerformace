import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllPosts } from "../apiServices/apiActions";
import { useSelector } from "react-redux";

export default function PostList() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});
  const user = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const getPosts = async ({ page, user }) => {
      try {
        const response = await fetchAllPosts({ page, user });
        setData((prev) => {
          return {
            ...response,
          };
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      getPosts({ page, user });
    }
  }, [user, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //No Data
  if (data?.posts?.length > 0)
    return (
      <section className="overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap mb-32 -mx-4">
            {/* Posts */}
            {data?.posts.map((post) => (
              <div key={post._id} className="w-full md:w-1/2 lg:w-1/3 p-4">
                <Link to={`/posts/${post._id}`}>
                  <div className="bg-white border border-gray-100 hover:border-orange-500 transition duration-200 rounded-2xl h-full p-3">
                    <div className="relative" style={{ height: 240 }}>
                      <img
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                        src={post?.image}
                        alt={post?.title}
                      />
                      {/* Title */}
                      <div className="absolute bottom-0 left-0 z-10 p-3 w-full bg-black bg-opacity-50">
                        <h3 className="text-lg font-semibold text-white">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                    <div className="pt-3 pb-3 px-4">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <p className="text-gray-500 text-sm">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={4}
                          height={4}
                          viewBox="0 0 4 4"
                          fill="none"
                        >
                          <circle cx={2} cy={2} r={2} fill="#B8B8B8" />
                        </svg>
                        <div className="py-1 px-2 rounded-md border border-gray-100 text-xs font-medium text-gray-700 inline-block">
                          {post?.category?.categoryName}
                        </div>
                      </div>
                      <div
                        className="rendered-html-content"
                        dangerouslySetInnerHTML={{
                          __html: post?.description,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center my-8 space-x-4">
          {data?.totalPages > 1 && (
            <button
              onClick={() => handlePageChange(page - 1)}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Previous
            </button>
          )}

          <span className="text-sm font-semibold">
            Page {page} of {data?.totalPages}
          </span>

          {page < data?.totalPages && (
            <button
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Next
            </button>
          )}
        </div>
      </section>
    );

  return <div>No Post Data</div>;
}
