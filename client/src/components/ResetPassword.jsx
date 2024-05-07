import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

const ResetPassword = () => {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
  });
  const { token } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:5000/auth/reset-password/${token}`, formData)
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">New Password: </label>
        <input
          type="password"
          placeholder="New password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
        <br />
        <br />
      </form>
    </div>
  );
};

export default ResetPassword;
