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
import PrivateRoute from "./PrivateRoute";
import JobDetails from "../pages/JobDetails";
import UpdateJob from "../pages/UpdateJob"; // ✅ Import UpdateJob

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/alljobs",
        element: (
          <PrivateRoute>
            <Alljobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/addjobs",
        element: <AddJobs />,
      },
      {
        path: "/acceptedtask",
        element: <AcceptTask />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/trust",
        element: <Trust />,
      },
      {
        path: "/allJobs/:id",
        element: <JobDetails />,
      },
      {
        path: "/updateJob/:id", // ✅ New route added
        element: (
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
