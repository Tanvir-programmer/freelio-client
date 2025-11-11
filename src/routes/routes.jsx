import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Alljobs from "../pages/Alljobs";
import AddJobs from "../pages/AddJobs";
import AcceptTask from "../pages/AcceptTask";
import Home from "../pages/Home";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import Trust from "../components/Trust";
import Error from "../pages/Error";
// import JobCard from "../pages/JobCard";
import PrivateRoute from "./PrivateRoute";
import JobDetails from "../pages/JobDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/alljobs",
        element: (
          <PrivateRoute>
            <Alljobs></Alljobs>
          </PrivateRoute>
        ),
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
      {
        path: "/trust",
        element: <Trust></Trust>,
      },
      {
        path: "/allJobs/:id",
        element: <JobDetails />,
      },
    ],
  },
]);

export default router;
