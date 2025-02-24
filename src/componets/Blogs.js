import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { makeStyles } from "@mui/styles";
import config from "../config";
import { Box, CircularProgress } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto auto",
  },
  blogContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  blogImage: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  editButton: {
    background: "#f0f0f0",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "14px",
  },
  deleteButton: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "red",
    cursor: "pointer",
  },
}));

const Blogs = () => {
  const classes = useStyles();
  const [blogs, setBlogs] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = async () => {
    const res = await axios
      .get(`${config.BASE_URL}/api/blogs`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    setIsLoading(true);
    sendRequest()
      .then((data) => {
        setBlogs(data.blogs);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <Box
      flexGrow={1}
      justifyContent={"center"}
      display={"flex"}
      alignItems={"center"}
      width={"100%"}
      className={classes.container}
    >
      {isLoading && <CircularProgress size={50} />}
      {blogs && blogs?.length > 0 ? (
        blogs.map((blog, index) => (
          <Blog
            key={index}
            width={"100%"}
            backgroundColor={"#fff"}
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={blog.user.name}
            date={new Date(blog.date).toLocaleDateString()}
          />
        ))
      ) : (
        <h1 style={{ textAlign: "center" }}>No blogs found</h1>
      )}
    </Box>
  );
};

export default Blogs;
