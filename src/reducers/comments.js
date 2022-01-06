const commentReducer = (comments = [], action) => {
  switch (action.type) {
    case "CREATE_COMMENT":
      return [...comments, action.payload];

    case "FETCH_ALL_COMMENTS":
      return action.payload;
    case "DELETE_COMMENTS":
      return comments.filter((comment) => comment.postId !== action.payload);
    default:
      return comments;
  }
};

export default commentReducer;
