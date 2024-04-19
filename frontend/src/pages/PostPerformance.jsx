import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { fetchOnePost } from "../apiServices/apiActions";

export default function PostPerformance() {
  const { id } = useParams();
  const [postData, setPostData] = useState({});
  useEffect(() => {
    const getPost = async (id) => {
      try {
        const response = await fetchOnePost(id);
        setPostData((prev) => {
          return {
            ...response,
          };
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (id) {
      getPost(id);
    }
  }, [id]);

  const data = {
    labels: ["Likes", "Dislikes", "Neutral"],
    datasets: [
      {
        data: [postData?.post?.likes || 0, postData?.post?.dislikes || 0, postData?.post?.views - postData?.post?.likes - postData?.post?.dislikes || 0],
        // data: [12, 3, 18 - 12 - 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <>
        <div className="h-96">
            <div className="pie-chart w-full h-full">
                <Pie data={data} options={chartOptions} />
            </div>
            <div className="shares-info flex justify-center space-x-8 font-bold text-lg">
                {/* <p>Shares: { post.shares }</p> */}
                <p>Total views: {postData?.post?.views || 0}</p>
                <p>Shares: {postData?.post?.shares || 0}</p>
            </div>
        </div>
        <div className="flex-col items-between mb-3 m-auto mt-24 w-96">
          {/* Title */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{postData?.post?.title}</h3>

          {/* Description */}
          <p>
            {postData?.post?.description}
          </p>

        </div>
    </>
  );
}
