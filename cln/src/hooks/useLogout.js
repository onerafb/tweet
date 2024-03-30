import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();

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
      navigate("/auth");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return logout;
};

export default useLogout;
