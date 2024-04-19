import Chart from "chart.js/auto";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { fetchAllPosts } from "../apiServices/apiActions";
import PostList from "../components/PostList";
export default function Overview() {
  const user = useSelector((state) => state.auth.userId);
  const [postData, setPostData] = useState({});
  useEffect(() => {
    const getPosts = async ({ user }) => {
      try {
        const response = await fetchAllPosts({ user });
        setPostData((prev) => {
          return {
            ...response,
          };
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      getPosts({ user });
    }
  }, [user]);

  const data = {
    labels: postData?.posts?.map(post => post.title),
    datasets: [
        {
          label: 'Views',
          backgroundColor: 'rgba(14, 31, 198, 0.9)',
          data: postData?.posts?.map(post => post.views)
        },
        {
          label: 'Likes',
          backgroundColor: 'rgba(0, 200, 0, 0.6)',
          data: postData?.posts?.map(post => post.likes)
        },
        {
          label: 'Dislikes',
          backgroundColor: 'rgba(200, 0, 0, 0.6)',
          data: postData?.posts?.map(post => post.dislikes)
        },
        {
            label: 'Shares',
            backgroundColor: 'rgba(22, 178, 233, 0.8)',
            data: postData?.posts?.map(post => post.shares)
        },
      ]
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  }

  useEffect(() => {
    const chartInstances = Chart.instances;
    if (chartInstances && chartInstances.length > 0) {
      chartInstances.forEach((instance) => {
        instance.chart.destroy();
      });
    }
  }, []);
  return (
    <div>
      <h1 className="font-bold text-center text-xl">Performance of top 5 most viewed posts</h1>
      <div className="h-96">
        <Bar data={data} options = { options }/>
      </div>
      <h1 className="mt-8 font-bold text-center text-xl">You posts</h1>
      <PostList />
    </div>
  );
}
