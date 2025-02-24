import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { authActions } from "../store";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { lightTheme, darkTheme } from "../utils/theme";

const Header = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const theme = isDark ? darkTheme : lightTheme;

  const user = JSON.parse(localStorage.getItem("user"));

  const [value, setValue] = useState(0);

  return (
    <AppBar position="sticky" sx={{ background: theme.bg }}>
      <Toolbar
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "semibold",
            color: "white",
            textTransform: "uppercase",
          }}
        >
          BlogsApp
        </Typography>

        {user ? (
          <Box
            sx={{
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              gap: 3,
            }}
          >
            <NavLink to="/blogs" className="nav-links">
              All Blogs
            </NavLink>
            <NavLink to="/myBlogs" className="nav-links">
              My Blogs
            </NavLink>
            <NavLink to="/blog/add" className="nav-links">
              Add Blog
            </NavLink>
            {/* <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "white",
                },
              }}
            >
              <Tab
                component={Link}
                to="/blogs"
                label="All Blogs"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "1.2rem",
                  textTransform: "none",
                }}
              />
              <Tab
                component={Link}
                to="/myBlogs"
                label="My Blogs"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "1.2rem",
                  textTransform: "none",
                }}
              />
              <Tab
                component={Link}
                to="/blogs/add"
                label="Add Blog"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "1.2rem",
                  textTransform: "none",
                }}
              />
            </Tabs> */}
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              component={Link}
              to="/"
              sx={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "white",
                border: "2px solid white",
                borderRadius: 10,
                textTransform: "none",
                padding: "6px 16px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/signup"
              sx={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "white",
                border: "2px solid white",
                borderRadius: 10,
                textTransform: "none",
                padding: "6px 16px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
        {user && (
          <Button
            onClick={() => dispatch(authActions.logout())}
            component={Link}
            to="/"
            variant="contained"
            sx={{
              borderRadius: 10,
              fontWeight: "bold",
              fontSize: "1.1rem",
              textTransform: "none",
              backgroundColor: "#e53935",
              color: "white",
              "&:hover": {
                backgroundColor: "#c62828",
                color: "white",
              },
            }}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
