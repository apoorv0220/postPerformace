import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import PostPerformance from "./pages/PostPerformance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Login /> },
      { path: "overview", element: <Overview key={Math.random()*100}/> },
      { path: "posts/:id", element: <PostPerformance /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
