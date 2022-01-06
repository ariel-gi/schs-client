import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { createPost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

const Form = ({ currentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    selectedFile: "",
    teacher: "",
    period: "",
    class: "",
  });
  const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ ...postData, name: user?.result?.name }));
    clear();
    navigate("/posts");
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setPostData({ title: "", message: "", selectedFile: "", teacher: "", period: "", class: "" });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to make a post
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography varient="h6">{currentId ? "Edit" : "Create"} a post</Typography>
        <TextField name="teacher" variant="outlined" label="teacher" fullWidth value={postData.teacher} onChange={(e) => setPostData({ ...postData, teacher: e.target.value })} />
        <TextField name="class" variant="outlined" label="class" fullWidth value={postData.class} onChange={(e) => setPostData({ ...postData, class: e.target.value })} />
        <TextField name="period" variant="outlined" label="period" fullWidth value={postData.period} onChange={(e) => setPostData({ ...postData, period: e.target.value })} />
        <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

        <div className={classes.fileInput}>
          <FileBase type="file" muiltiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
