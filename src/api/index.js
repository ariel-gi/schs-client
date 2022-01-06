import axios from "axios";

const API = axios.create({ baseURL: "https://cryptic-beyond-16270.herokuapp.com" });
// const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }

  return req;
});

export const fetchPosts = () => API.get("/posts");
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || "none"}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likepost`);

export const createComment = (comment) => API.post("/comments", comment);
export const fetchComments = () => API.get("/comments");
export const deleteComments = (id) => API.delete("/comments", { data: { postId: id } });

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

export const requestEmail = (email) => API.post("/reset-password", { email: email });
export const changePassword = (formData) => API.post("/change-password", formData);
