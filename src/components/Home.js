import React from "react";

import JobPosts from "./JobPosts/JobPosts";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <JobPosts></JobPosts>
    </>
  );
};

export default Home;
