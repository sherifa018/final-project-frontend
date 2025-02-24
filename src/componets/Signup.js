import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { Email, Lock, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateInputs = () => {
    if (!inputs.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!inputs.email.trim() || !inputs.password.trim()) {
      setError("Email and password are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      setError("Invalid email address");
      return false;
    }
    setError("");
    return true;
  };

  const sendRequest = async (type = "login") => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${config.BASE_URL}/api/users/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const data = await sendRequest("signup");
      localStorage.setItem("userId", data.user._id);
      dispatch(authActions.login());
      navigate("/blogs");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      flexGrow={1}
      justifyContent={"center"}
      display={"flex"}
      alignItems={"center"}
      width={"100%"}
      sx={{
        background: "white",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 4,
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 3, color: "#333" }}
        >
          Sign Up
        </Typography>
        {error && (
          <Typography
            color="error"
            textAlign="center"
            sx={{ mb: 2, color: "#ff4444" }}
          >
            {error}
          </Typography>
        )}

        <TextField
          fullWidth
          name="name"
          onChange={handleChange}
          value={inputs.name}
          placeholder="Name"
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: "#666" }} />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="email"
          onChange={handleChange}
          value={inputs.email}
          type="email"
          placeholder="Email"
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: "#666" }} />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="password"
          onChange={handleChange}
          value={inputs.password}
          type="password"
          placeholder="Password"
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: "#666" }} />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            mb: 2,
            borderRadius: 3,
            height: 48,
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            "&:hover": {
              background: "linear-gradient(135deg, #2575fc, #6a11cb)",
            },
          }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
        </Button>
        <Button
          component={Link}
          to="/"
          fullWidth
          sx={{
            borderRadius: 3,
            height: 48,
            color: "#666",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.05)",
            },
          }}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
