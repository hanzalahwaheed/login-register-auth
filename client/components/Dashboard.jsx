import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios
      .get("http://localhost:5000/auth/logout")
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios.get("http://localhost:5000/auth/verify").then((response) => {
      if (response.data.status) {
      } else {
        navigate("/login");
      }
    });
  }, []);
  return (
    <div>
      Dashboard
      <br />
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
