import { lazy } from "react";
import { Navigate } from "react-router-dom";
import NonLayout from "../layouts/NonLayout.js";
import IoT from "../views/IoT.js";

const dataHome = {
  img: "/assets/images/anhavt.jpg",
  hello: `Hello, I'm Quang Oliu`,
  typing: [
    "Hi, I'm  <span style=color:red>Quang</span>",
    "I'm <span style=color:red>21</span> years old",
    "My SID <span style=color:red>B20DCCN537</span>",
    "My email <span style=color:red>Trantran30102002@gmail.com</span>",
    "My phone <span style=color:red>0862210445</span>",
    "<span style=color:red>Love You <3</span>",
  ],
  about: "I am currently a fourth-year student at PTIT, majoring in IT.",
  social: [
    {
      id: 1,
      type: "facebook",
      src: "../../src/assets/images/facebook.png",
      url: "https://www.facebook.com/QuangOliu",
    },
    {
      id: 2,
      type: "instagram",
      src: "../../src/assets/images/instagram.png",
      url: "https://www.instagram.com/quang.oliu/",
    },
  ],
  CV: "#",
};

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const CustomLayout = lazy(() => import("../layouts/CustomLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/MyAbout.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const History = lazy(() => import("../views/ui/historyTurn.js"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <CustomLayout />,
    children: [
      { path: "/", element: <Navigate to='/iot' /> },
      { path: "/iot", exact: true, element: <IoT /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About data={dataHome} /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/history", exact: true, element: <History /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  }
];

export default ThemeRoutes;
