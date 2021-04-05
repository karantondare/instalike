import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import moment from "moment";
import { useDispatch } from "react-redux";

import { likePost, deletePost } from "../../../actions/postsActions";
import useStyles from "./styles";

const Post = ({ post, setCurrentId, setCreatePost }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <div>
          <div className={classes.title}>
            <Typography variant="h6">{post.creator}</Typography>
            <Typography variant="body2" className={classes.time}>
              {moment(post.createdAt).fromNow()}
            </Typography>
          </div>
        </div>
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/64483658/113504121-9fc14600-9553-11eb-921a-3a65002bfc03.jpg"
          }
          title={post.title}
        />

        <CardContent>
          <Typography
            // className={classes.title}
            gutterBottom
            variant="h6"
            component="h2"
          >
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
          <div>
            <Typography variant="body2" color="primary" component="h2">
              {post.tags.map((tag) => `${tag} `)}
            </Typography>
          </div>
        </CardContent>

        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(likePost(post._id))}
          >
            {post.likeCount === 0 ? (
              <FavoriteBorderIcon fontSize="small" />
            ) : (
              <FavoriteIcon fontSize="small" />
            )}
            {post.likeCount === 0 ? "" : post.likeCount}
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setCurrentId(post._id);
              setCreatePost(true);
            }}
          >
            <EditIcon fontSize="default" />
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
