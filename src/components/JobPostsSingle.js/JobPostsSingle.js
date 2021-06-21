import React from "react";
import { Button, Card } from "antd";
import { Link } from "react-router-dom";

const JobPostsSingle = ({ job }) => {
  const { name, description, salary, _id } = job;
  return (
    <div style={{ padding: "10px" }}>
      <Card
        type="primary"
        actions={[
          <Link
            style={{ textDecoration: "none", color: "black" }}
            // to={"/serviceRegister/" + _id}
          >
            <Button
              onClick={() => {
                alert(`applied to job id ${_id}`);
              }}
            >
              Apply
            </Button>
          </Link>,
        ]}
        title={name}
        bordered={true}
        hoverable={true}
      >
        {description}
        <br />
        <h6>Salary:{salary}$ /hr </h6>
      </Card>
    </div>
  );
};

export default JobPostsSingle;
