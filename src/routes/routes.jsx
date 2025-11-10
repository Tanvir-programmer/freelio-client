import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Alljobs from "../pages/Alljobs";
import AddJobs from "../pages/AddJobs";
import AcceptTask from "../pages/AcceptTask";
import Home from "../pages/Home";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/alljobs",
        element: <Alljobs></Alljobs>,
      },
      {
        path: "/addjobs",
        element: <AddJobs></AddJobs>,
      },
      {
        path: "/accepttask",
        element: <AcceptTask></AcceptTask>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Registration></Registration>,
      },
    ],
  },
]);

export default router;
