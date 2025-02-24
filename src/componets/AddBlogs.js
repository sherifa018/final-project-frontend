import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import config from "../config";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const AddBlogs = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [inputs, setInputs] = useState({
    title: (state && state.title) || "",
    description: (state && state.desc) || "",
  });
  const [imagePreview, setImagePreview] = useState((state && state.img) || "");
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleImageUpload = (file) => {
    if (file && file.progress == 100) {
      console.log(file.allEntries[0].cdnUrl);
      setImagePreview(file.allEntries[0].cdnUrl);
    }
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (state) {
        const res = await axios.put(
          `${config.BASE_URL}/api/blogs/update/${state.id}`,
          {
            title: inputs.title,
            desc: inputs.description,
            img: imagePreview,
            user: user._id,
          }
        );
      } else {
        const res = await axios.post(`${config.BASE_URL}/api/blogs/add`, {
          title: inputs.title,
          desc: inputs.description,
          img: imagePreview,
          user: user._id,
        });
      }

      navigate("/blogs");
      enqueueSnackbar(
        state ? "post Edit successfully" : "post created successfully"
      );
      setIsLoading(false);
    } catch (err) {
      console.error("Error posting blog:", err);
      enqueueSnackbar(err.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ p: 4, mt: 4, borderRadius: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {state ? "Edit Your Blog" : " Post Your Blog"}
        </Typography>
        <Box
          component="form"
          onSubmit={sendRequest}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Title"
            name="title"
            fullWidth
            variant="outlined"
            value={inputs.title}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            variant="outlined"
            multiline
            rows={6}
            value={inputs.description}
            onChange={handleChange}
          />
          <FileUploaderRegular
            onChange={handleImageUpload}
            sourceList="local, camera, facebook, gdrive"
            cameraModes="photo, video"
            classNameUploader="uc-light"
            pubkey="68196083e86668defa3b"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Game preview"
              className="mt-2 rounded-md max-h-40 object-cover"
            />
          )}
          <Button
            disabled={isLoading}
            type="submit"
            variant="contained"
            sx={{ mt: 2, borderRadius: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddBlogs;
