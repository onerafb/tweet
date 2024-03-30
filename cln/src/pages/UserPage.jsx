import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import Post from "../components/Post";
import postsAtom from "../atoms/postsAtom";
import Ptrans from "../components/Ptrans";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  // !error card |v|
  const [posts, setPosts] = useRecoilState(postsAtom);

  const { username } = useParams();
  const showToast = useShowToast();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data?.success === false) {
          throw new Error(data.message);
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username, showToast, setPosts]);

  useEffect(() => {
    //!function two
    const getPosts = async () => {
      if (!user) return;
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };
    getPosts();
  }, [user, username, setPosts]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!user && !loading) return <h1>User not found</h1>;

  return (
    <div>
      <UserHeader user={user} />
      <Box mt={"20px"} ml={"1%"} textTransform={"capitalize"}>
        {!fetchingPosts && posts.length === 0 && <h1>User has no posts .</h1>}
      </Box>
      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
      <Ptrans />
    </div>
  );
};

export default UserPage;
