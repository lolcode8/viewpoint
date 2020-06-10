import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import "/Users/user/Desktop/judger/src/styles/navbar.css";

const Navbar = (props) => {
  console.log(props.navigation);
  return (
    <div className="border-grayy align-middle border-b-2 flex justify-between pt-3 pb-1 text-l bg-bluey">
      <div>
        <i className="pl-2  material-icons color-grayy">menu</i>
      </div>
      <div className="font-mono text-grayy  text-center">Undefined</div>
      <Link to={props.navigation}>
        <i className="pr-2  material-icons color-grayy">{props.postAdd}</i>
      </Link>
    </div>
  );
};

export default Navbar;