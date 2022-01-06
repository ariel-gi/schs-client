import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";
import { deletePost, likePost } from "../../../actions/posts";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const handleView = () => {
    if (user) {
      try {
        setCurrentId(post._id);
        navigate("/viewmore?postId=" + post._id);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Sign In to view more");
    }
  };

  const handleEdit = () => {
    try {
      setCurrentId(post._id);
      navigate("/edit", { state: { currentId: post._id } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = () => {
    if (user) {
      dispatch(likePost(post._id));
    } else {
      alert("Sign In to Like a post");
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} />
      <div>
        <Typography style={{ padding: "5px 10px" }} variant="h6">
          {post.name}
        </Typography>
        <Typography style={{ padding: "0px 10px" }} variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button style={{ color: "white" }} size="small" onClick={handleEdit}>
            <MoreHorizIcon fontsize="default" />
          </Button>
        )}
      </div>
      <Typography className={classes.title} variant="h6" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="h6" component="p">
          {post.message}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          teacher: {post.teacher}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          class: {post.class}
        </Typography>
      </CardContent>
      <Button onClick={handleView}>View More</Button>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
