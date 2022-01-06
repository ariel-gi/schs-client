import React, { useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";
import { getPosts, getPostsBySearch } from "./../../actions/posts";
import { useLocation } from "react-router-dom";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const search = useLocation().search;
  const searchQuery = new URLSearchParams(search).get("searchQuery");
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    if (!searchQuery) {
      dispatch(getPosts());
    } else {
      dispatch(getPostsBySearch({ search: searchQuery }));
    }
  }, [posts, searchQuery, dispatch]);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
