import React from "react";
import Banner from "../components/Banner";
import LatestJobs from "../components/LatestJobs";
import JobCategory from "../components/JobCategory";
import SiteIntro from "../components/SiteIntro";
import Qna from "../components/Qna";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestJobs></LatestJobs>
      <JobCategory></JobCategory>
      <SiteIntro></SiteIntro>
      <Qna></Qna>
    </div>
  );
};

export default Home;
