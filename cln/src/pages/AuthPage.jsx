import React from "react";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtoms";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  return <>{authScreenState === "login" ? <Signin /> : <Signup />}</>;
};

export default AuthPage;
