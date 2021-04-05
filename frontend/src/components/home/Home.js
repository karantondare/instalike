import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Button, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { getPosts } from "../../actions/postsActions";

import Posts from "../posts/Posts";
import Form from "../form/Form";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [createPost, setCreatePost] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = localStorage.getItem("profile");

  useEffect(() => {
    dispatch(getPosts());
  });

  return (
    <div>
      <Grow in>
        <Container>
          {user ? (
            <Grid item xs={12} sm={12} style={{ justifyContent: "center" }}>
              <div className={classes.div}>
                <Button
                  variant="contained"
                  color="primary"
                  justify="center"
                  onClick={() =>
                    setCreatePost((prevCreatePost) => !prevCreatePost)
                  }
                  className={classes.button}
                >
                  {createPost ? "Cancel" : "Create Post"}
                </Button>
              </div>
              {createPost && (
                <Form
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                  className={classes.form}
                />
              )}
            </Grid>
          ) : (
            <Typography
              variant="h6"
              align="center"
              color="secondary"
              style={{ marginBottom: "2rem" }}
            >
              Login to create a post.
            </Typography>
          )}
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={12}>
              <Posts
                setCurrentId={setCurrentId}
                setCreatePost={setCreatePost}
              />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
