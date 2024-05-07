import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const ForgotPassword = () => {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/auth/forgot-password", formData)
      .then((response) => {
        if (response.data.status) {
          alert("Check your email for Reset Password Link");
          navigate("/login");
        }
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          placeholder="email"
          id="email"
          name="email"
          value={formData.email}
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

export default ForgotPassword;
