import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const Login = () => {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
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
    Axios.post("http://localhost:5000/auth/login", formData)
      .then((response) => {
        if (response.data.status) navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
        <br />
        <br />
        <Link to="/forgotpassword">Forgot Password?</Link>
        <p>
          New User? Register <Link to="/register">Here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
