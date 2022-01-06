import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import decode from "jwt-decode";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
          SCHS Homework
        </Typography>
      </div>
      <div style={{ padding: 10 }}>
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIcon fontSize="large" />
        </Button>
      </div>
      <Button component={Link} to="/createpost">
        <AddBoxOutlinedIcon fontSize="large" />
      </Button>
      <Button component={Link} to="/questions-answers">
        <Typography variant="h6">HW</Typography>
      </Button>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            {" "}
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
