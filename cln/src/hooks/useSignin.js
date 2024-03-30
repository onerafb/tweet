import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";
import { useState } from "react";

const useSignin = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);

  const Login = async (inputs) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (data?.success === false) {
        throw new Error(data.message);
      }

      showToast("Success", data.message, "success");
      localStorage.setItem("user-threads", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };
  return { loading, Login };
};

export default useSignin;
