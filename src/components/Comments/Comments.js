import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, TextField } from "@material-ui/core";
import { createComment } from "../../actions/comments";
import ViewComments from "./ViewComments/ViewComments";

const Comments = ({ currentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState({ name: user?.result.name, pfp: user?.result.imageUrl, commenter: user?.result._id, comment: "", postId: currentId });

  const clear = () => {
    setComment({ ...comment, comment: "" });
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      dispatch(createComment(comment));
      clear();
    }
  };

  return (
    <Container>
      <TextField name="message" variant="outlined" label="enter comment" value={comment.comment} fullWidth onChange={(e) => setComment({ ...comment, comment: e.target.value })} onKeyDown={keyPress} />
      <ViewComments currentId={currentId} />
    </Container>
  );
};

export default Comments;
