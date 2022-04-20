import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "../apollo";
import Login from "./Login";
import Profile from "./Profile";

export default function Me() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <Profile /> : <Login />;
}
