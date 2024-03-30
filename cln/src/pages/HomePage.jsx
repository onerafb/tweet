import { Box, Flex, Spinner, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import SuggestedUsers from "../components/SuggestedUsers";
import Ptrans from "../components/Ptrans";

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res = await fetch(`/api/posts/`);
        const data = await res.json();
        if (data?.success === false) {
          throw new Error(data.message);
        }
        console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast, setPosts]);

  return (
    <>
      <Box>
        {!loading && posts.length === 0 && (
          <Box width={"100%"} m={"15px"} color={"purple"}>
            <h1>Follow some users to see the feed.</h1>
          </Box>
        )}

        {loading && (
          <Flex justify={"center"}>
            <Spinner size="xl" />
          </Flex>
        )}

        {posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
      </Box>
      <Box
        flex={30}
        display={{
          base: "block",
          md: "block",
        }}
      >
        <SuggestedUsers />
        <Ptrans />
      </Box>
    </>
  );
};

export default HomePage;
