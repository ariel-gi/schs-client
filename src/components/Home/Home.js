import React, { useState } from "react";
import { Grow, Grid, Container } from "@material-ui/core";
import Posts from "../Posts/Posts";
import SearchBy from "../SearchBy/SearchBy";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <SearchBy />
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
