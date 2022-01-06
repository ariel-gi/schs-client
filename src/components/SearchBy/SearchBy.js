import React, { useState, useEffect } from "react";
import { Container, Button, Typography, TextField } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import { getPostsBySearch } from "../../actions/posts";
import { useDispatch } from "react-redux";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchBy = () => {
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ search: search }));
      navigate(`/posts/search?searchQuery=${search || "none"}`);
    } else {
      navigate("/posts");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <Container>
      <TextField label="Search by Teacher" variant="outlined" value={search} onKeyPress={handleKeyPress} onChange={(e) => setSearch(e.target.value)} />
      <Button color="primary" variant="contained" onClick={searchPost}>
        Submit
      </Button>
    </Container>
  );
};

export default SearchBy;
