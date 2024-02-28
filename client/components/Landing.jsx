import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      Landing
      <br />
      <button>
        <Link to="/dashboard">Dashboard</Link>
      </button>
    </div>
  );
};

export default Landing;
