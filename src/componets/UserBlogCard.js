import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";
import config from "../config";
import { useSnackbar } from "notistack";

const UserBlogCard = ({ title, desc, img, user, id, date, handleDelete }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/blog/add", {
      state: { title, img, desc, id },
    });
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`${config.BASE_URL}/api/blogs/${id}`)
      .catch((err) => console.log(err));
    return res.data;
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    deleteRequest()
      .then(() => {
        handleDelete(id);
        enqueueSnackbar("post deleted successfully");
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  return (
    <div style={{ width: "100%" }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: "900px",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
          borderRadius: 3,
          transition: "0.3s",
          ":hover": {
            boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <Box display="flex">
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditOutlineIcon color="warning" />
          </IconButton>
          <IconButton onClick={() => setOpen(true)}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </Box>

        <CardHeader
          avatar={
            <Avatar
              className={classes.font}
              sx={{ bgcolor: "#1976d2" }}
              aria-label="recipe"
            >
              {user ? user.charAt(0) : ""}
            </Avatar>
          }
          title={
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>
          }
          subheader={
            <Typography variant="caption" color="text.secondary">
              {new Date(date).toDateString()}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          height="400"
          image={img}
          alt={title}
          sx={{ borderRadius: 2 }}
        />
        <CardContent>
          <hr />
          <Typography
            className={classes.font}
            variant="body1"
            color="text.primary"
            sx={{ mt: 2 }}
          >
            <b>{user}</b>: {desc}
          </Typography>
        </CardContent>

        {/* Confirmation Dialog */}
        <Dialog open={open} onClose={() => !loading && setOpen(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this blog? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => !loading && setOpen(false)}
              color="primary"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
};

export default UserBlogCard;
