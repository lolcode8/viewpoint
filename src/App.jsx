import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import firebase from "firebase";

import CreatePost from "containers/create-post";
import Home from "containers/home";
import Login from "containers/login";
import ProtectedRoute from "containers/protected-route";
import { addUserToState, handleNewUserSignup } from "store/thunks/users";

function App(props) {
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    //on authstate changed
    const firebaseListener = firebase
      .auth()
      .onAuthStateChanged(function (user) {
        firebase
          .auth()
          .getRedirectResult()
          .then((res) => {
            setIsUserLoading(false);
            if (res.user) {
              if (res.additionalUserInfo.isNewUser) {
                props.handleNewUserSignupThunk(res);
              } else {
                props.addUserToStateThunk(user);
              }
            }
          });
        setIsUserLoading(false);
      });
    return () => {
      firebaseListener();
    };
  }, []);

  if (isUserLoading)
    return (
      <div className="h-screen w-screen bg-blueGray text-grayy flex justify-center items-center text-xl font-noto tracking-wide">
        Loading...
      </div>
    );

  return (
    <Router>
      <div>
        {/* Protected Routes */}
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute path="/create-post" component={CreatePost} />
        {/* Public Routes */}
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}
const mapDispatchToProps = (dispatch) => ({
  addUserToStateThunk: (user) => dispatch(addUserToState(user)),
  handleNewUserSignupThunk: (userObject) =>
    dispatch(handleNewUserSignup(userObject)),
});

export default connect(null, mapDispatchToProps)(App);
