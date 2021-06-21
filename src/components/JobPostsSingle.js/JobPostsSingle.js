import React, { useContext } from "react";
import { Button, Card } from "antd";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const JobPostsSingle = ({ job }) => {
  const { name, description, salary, _id } = job;
  // eslint-disable-next-line no-unused-vars
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div style={{ padding: "10px" }}>
      <Card
        type="primary"
        actions={
          loggedInUser.name !== undefined
            ? [
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
              ]
            : [
                <>
                  <Link to={`/loginAsJobSeeker`}>Please login To apply</Link>
                </>,
              ]
        }
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
