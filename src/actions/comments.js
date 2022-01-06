import * as api from "../api";

export const createComment = (comment) => async (dispatch) => {
  try {
    const { data } = await api.createComment(comment);

    dispatch({ type: "CREATE_COMMENT", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getComments = () => async (dispatch) => {
  try {
    const { data } = await api.fetchComments();

    dispatch({ type: "FETCH_ALL_COMMENTS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
