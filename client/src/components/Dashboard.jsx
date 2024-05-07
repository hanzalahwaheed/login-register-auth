import axios from "axios";
import { useEffect } from "react";
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
      if (!response.data.status) navigate("/login");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
