import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";

const useLogout = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();

  const logout = async () => {
    try {
      const res = await fetch(`/api/users/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data?.success === false) {
        throw new Error(data.message);
      }

      showToast("Success", data.message, "success");

      localStorage.removeItem("user-threads");
      setUser(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return logout;
};

export default useLogout;
