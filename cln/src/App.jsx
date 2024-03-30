import React from "react";
import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import userAtom from "./atoms/userAtom";
import { useRecoilValue } from "recoil";
import UpdateProfile from "./pages/UpdateProfile";
import CreatePost from "./components/CreatePost";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const user = useRecoilValue(userAtom);

  return (
    <Container maxW="620px">
      <Header />
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route
            path="/update"
            element={user ? <UpdateProfile /> : <Navigate to="/auth" />}
          />

          <Route
            path="/:username"
            element={
              user ? (
                <>
                  <UserPage />
                  <CreatePost />
                </>
              ) : (
                <UserPage />
              )
            }
          />
          <Route path="/:username/post/:pid" element={<PostPage />} />
        </Routes>
      </AnimatePresence>
    </Container>
  );
};

export default App;
