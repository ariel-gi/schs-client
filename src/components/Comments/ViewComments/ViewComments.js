import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Grid, Typography, Button, Paper, Avatar, Divider } from "@material-ui/core";
import { getComments } from "../../../actions/comments";
import moment from "moment";
import useStyles from "./styles";

const ViewComments = ({ currentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const comments = useSelector((state) => state.comments.filter((comment) => comment.postId === currentId));
  const user = JSON.parse(localStorage.getItem("profile"));

  console.log(comments);

  return (
    <div style={{ padding: 14 }} className="App">
      <h1>Comments</h1>
      {comments.map((comment) => (
        <Paper style={{ padding: "5px 20px" }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar className={classes.purple} alt={comment.name} src={comment.pfp}>
                {comment.name.charAt(0)}
              </Avatar>
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>{comment.name}</h4>
              <p style={{ textAlign: "left" }}>{comment.comment}</p>
              <p style={{ textAlign: "left", color: "gray" }}>{moment(comment.createdAt).fromNow()}</p>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
        </Paper>
      ))}
    </div>
  );
};

export default ViewComments;
