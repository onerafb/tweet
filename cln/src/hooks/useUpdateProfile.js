import React, { useState } from "react";
import userAtom from "../atoms/userAtom";
import { useRecoilState } from "recoil";
import useShowToast from "./useShowToast";

const useUpdateProfile = () => {
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  const showToast = useShowToast();

  const Update = async (inputs, imgUrl) => {
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
      });
      const data = await res.json(); // updated user object
      if (data?.success === false) {
        throw new Error(data.message);
      }

      showToast("Success", data.message, "success");
      setUser(data);
      localStorage.setItem("user-threads", JSON.stringify(data));
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setUpdating(false);
    }
  };
  return { Update, updating };
};

export default useUpdateProfile;
