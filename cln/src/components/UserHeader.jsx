import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import { Link as RouterLink } from "react-router-dom";
import userAtom from "../atoms/userAtom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";

const UserHeader = ({ user }) => {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom); // logged in user
  const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);

  // const [following, setFollowing] = useState(
  //   user.followers.includes(currentUser?._id)
  // );
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      console.log("copied");
      toast({
        title: "Success.",
        status: "success",
        description: "Profile link copied.",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    });
  };

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text
            fontSize={"2xl"}
            fontWeight={"bold"}
            textTransform={"uppercase"}
          >
            {user.username}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"} textTransform={"lowercase"}>
              {user.username}
            </Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={2}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
              name={user.username}
              src={user.profilePic}
              size={{
                base: "md", //mobile
                md: "xl", //tablet
                // lg:"md" //full screen
              }}
            />
          )}
          {!user.profilePic && (
            <Avatar
              name={user.name}
              src="https://bit.ly/broken-link"
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
        </Box>
      </Flex>

      <Text>{user.bio}. </Text>
      {currentUser?._id === user._id && (
        <Link as={RouterLink} to="/update">
          <Button size={"md"} letterSpacing={"0.9px"} fontWeight={"500"}>
            {" "}
            PROFILE
          </Button>
        </Link>
      )}
      {currentUser?._id !== user._id && (
        <Button
          size={"md"}
          letterSpacing={"0.9px"}
          onClick={handleFollowUnfollow}
          isLoading={updating}
        >
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}> instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} color="" />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} color="" />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} color={"white"} onClick={copyURL}>
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}> Threads</Text>
        </Flex>
        {/* <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}> Replies</Text>
        </Flex> */}
      </Flex>
    </VStack>
  );
};

export default UserHeader;
