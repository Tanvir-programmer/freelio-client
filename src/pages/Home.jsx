import React from "react";
import Banner from "../components/Banner";
import LatestJobs from "../components/LatestJobs";
import JobCategory from "../components/JobCategory";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestJobs></LatestJobs>
      <JobCategory></JobCategory>
    </div>
  );
};

export default Home;
