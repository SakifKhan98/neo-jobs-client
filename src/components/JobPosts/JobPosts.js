import React, { useEffect, useState } from "react";
import JobPostsSingle from "../JobPostsSingle.js/JobPostsSingle";
import { Col, Pagination, Row } from "antd";

const pageSize = 20;

const JobPosts = () => {
  // eslint-disable-next-line no-unused-vars
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
    console.log(jobs);
  }, []);
  //   let data = [];
  const [state, setState] = useState({
    totalPage: 30 / pageSize,
    current: 1,
    minIndex: 0,
    maxIndex: pageSize,
  });

  //   for (let i = 1; i <= 30; i++) {
  //     data.push(i);
  //   }

  //   console.log(data);

  const handleChange = (page) => {
    setState({
      ...state,
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };
  return (
    <div
      style={{ marginTop: "30px", padding: "30px" }}
      className="site-card-wrapper"
    >
      <Row gutter={16}>
        {jobs?.map(
          (job, index) =>
            index >= state.minIndex &&
            index < state.maxIndex && (
              <Col span={6}>
                <JobPostsSingle key={job._id} job={job}></JobPostsSingle>
              </Col>
            )
        )}
      </Row>
      {/* <Row gutter={16}>
        {jobs.map((job) => (
          <Col span={6}>
            <JobPostsSingle key={job.id} job={job}></JobPostsSingle>
          </Col>
        ))}
      </Row> */}
      <center>
        <Pagination
          pageSize={pageSize}
          current={state.current}
          total={30}
          onChange={handleChange}
          style={{ bottom: "0px" }}
        />
      </center>
    </div>
  );
};

export default JobPosts;
