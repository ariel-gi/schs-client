import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardMedia, Typography, Container, CardContent } from "@material-ui/core";
import useStyles from "./styles";
import moment from "moment";
import Comments from "../Comments/Comments";
import { getPosts } from "../../actions/posts";
import { getComments } from "../../actions/comments";

const Viewmore = () => {
  const dispatch = useDispatch();
  dispatch(getPosts());
  dispatch(getComments());

  const search = useLocation().search;
  const currentId = new URLSearchParams(search).get("postId");
  const postsIds = useSelector((state) => state.posts.map((post) => post._id));
  const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getComments());
  }, [currentId, dispatch]);

  if (postsIds.includes(currentId)) {
    return (
      <Container>
        <Card className={classes.card}>
          <img src={post?.selectedFile} />
          <div>
            <Typography style={{ marginLeft: 10 }} variant="h4">
              {post?.name}
            </Typography>
            <Typography style={{ marginLeft: 10 }} variant="body2">
              {moment(post?.createdAt).fromNow()}
            </Typography>
          </div>
          <Typography style={{ marginLeft: 10 }} variant="h5">
            {post?.title}
          </Typography>
          <Typography style={{ marginLeft: 10 }} variant="body2" component="p">
            {post?.message}
          </Typography>
          <CardContent>
            <Typography color="primary">Teacher: {post?.teacher}</Typography>
            <Typography color="primary">Period: {post?.period}</Typography>
            <Typography color="primary">Class: {post?.class}</Typography>
          </CardContent>
        </Card>
        <div style={{ padding: 14 }}>
          <Comments currentId={currentId} />
        </div>
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>No post with that id</h1>
      </Container>
    );
  }
};

export default Viewmore;
