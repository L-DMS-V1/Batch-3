import React, { useState } from "react";
import { registerUser } from "./Api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [accountId, setAccountId] = useState("");
  const [accountName, setAccountName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added for confirm password
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const navigator = useNavigate();

  // Validation Logic
  const validate = () => {
    const errors = {};

    if (!accountId.trim()) errors.accountId = "Account ID is required";
    if (!accountName.trim()) errors.accountName = "Full Name is required";
    if (!username.trim()) errors.username = "Username is required";
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email format";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"; // Confirm password validation
    }
    if (!role) errors.role = "Role is required";

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // Stop submission if validation fails

    try {
      const response = await registerUser({
        accountId,
        accountName,
        username,
        email,
        password,
        role,
      });

      if (response.data === "User registered successfully") {
        toast.success("Registered successfully!", {
          autoClose: 2000,
        });

        setTimeout(() => {
          navigator("/signin"); // Navigate after 2 seconds
        }, 2000);
      } else {
        toast.error("Error: " + response.data, {
          autoClose: 2000,
        });
        navigator("/");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
      toast.error("Registration failed", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light mt-2" style={{ backgroundImage: `url('/path/to/image2.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="card p-4 shadow-lg mt-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center text-success mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Company ID"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="form-control"
            />
            {errors.accountId && <small className="text-danger">{errors.accountId}</small>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Full Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="form-control"
            />
            {errors.accountName && <small className="text-danger">{errors.accountName}</small>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
            {errors.username && <small className="text-danger">{errors.username}</small>}
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
            />
            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
          </div>
          <div className="mb-3">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-control"
            >
              <option value="">--Select Role--</option>
              <option value="ADMIN">ADMIN</option>
              <option value="MANAGER">MANAGER</option>
              <option value="EMPLOYEE">EMPLOYEE</option>
            </select>
            {errors.role && <small className="text-danger">{errors.role}</small>}
          </div>
          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-3 text-center">
          <p className="text-muted">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary">
              Sign In
            </Link>
          </p>
        </div>
        {message && <p className="mt-3 text-center text-danger">{message}</p>}
      </div>
    </div>
  );
}

export default SignUp;
