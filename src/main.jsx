import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import AddTask from "./AddTask.jsx";
import List from "./List.jsx";
import UpdataTask from "./UpdataTask.jsx"
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Procteted from "./Protected.jsx";

let allRoutes = createBrowserRouter([
  { path: "/", element: <Procteted><List/></Procteted>},
  { path: "/add", element:<Procteted><AddTask /></Procteted>  },
   { path: "/update/:id", element:<Procteted><UpdataTask/></Procteted> },
   {path: "/login", element:<Login/>},
      { path: "/signup", element:<Signup/>}
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={allRoutes} />
  </StrictMode>,
);
