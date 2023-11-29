import { RouteObject } from "react-router-dom";

import Home from "@/pages/home";
import Layout from "@/pages/layout";
import ArticleComponent from "@/pages/article";

const routers: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/home",
        element: <ArticleComponent />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404</div>,
  },
];

export default routers;
