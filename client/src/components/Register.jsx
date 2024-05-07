import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
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
    // You can access form data from formData state
    // Perform any other actions like submitting data to a server
    Axios.post("http://localhost:5000/auth/register", formData)
      .then((response) => {
        if (response.data.status) navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          placeholder="username"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <br />
        <br />
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
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
