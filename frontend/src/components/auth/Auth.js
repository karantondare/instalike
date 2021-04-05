import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import useStyles from "./styles";
import Input from "./Input";
import Icon from "./Icon";
import { AUTHENTICATION } from "../../constants/actionTypes";

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = () => {};
  const handleSubmit = () => {};
  const handleShowPassword = () => setShowPassword((prevState) => !prevState);
  const switchMode = () => {
    setIsSignup((prevState) => !prevState);
    setShowPassword((prevState) => !prevState);
  };

  const googleSuccess = async (res) => {
    const result = await res?.profileObj;
    const token = await res?.tokenId;
    console.log(result);
    console.log(token);
    try {
      dispatch({
        type: AUTHENTICATION,
        payload: { result, token },
      });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => console.log("Google Sign in was unsuccessful.");

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <GoogleLogin
            clientId="780385843073-js6m99ad957ddbsg7heug47pf5l7j564.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
