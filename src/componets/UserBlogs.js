/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import config from "../config";
import { Box, CircularProgress } from "@mui/material";
import UserBlogCard from "./UserBlogCard";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px auto",
    width: "80%",
  },
  blogContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

const UserBlogs = () => {
  const classes = useStyles();
  const [blogs, setBlogs] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const sendRequest = async () => {
    const res = await axios
      .get(`${config.BASE_URL}/api/blogs/user/${user._id}`)
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    const data = await res.data;
    setIsLoading(false);
    return data;
  };

  useEffect(() => {
    setIsLoading(true);
    sendRequest()
      .then((data) => {
        console.log(data);

        setBlogs(data.blogs);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    const newBlogs = blogs.filter((blog) => blog._id !== id);
    setBlogs(newBlogs);
  };
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
          <UserBlogCard
            key={blog._id}
            width={"100%"}
            backgroundColor={"#fff"}
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={blog.user.name}
            date={new Date(blog.date).toLocaleDateString()}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <h1 style={{ textAlign: "center" }}>No blogs found</h1>
      )}
    </Box>
  );
};

export default UserBlogs;
