import React from "react";
import Banner from "../components/Banner";
import LatestJobs from "../components/LatestJobs";
import JobCategory from "../components/JobCategory";
import SiteIntro from "../components/SiteIntro";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestJobs></LatestJobs>
      <JobCategory></JobCategory>
      <SiteIntro></SiteIntro>
    </div>
  );
};

export default Home;
