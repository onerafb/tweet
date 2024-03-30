import { Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";

const Logout = () => {
  const logout = useLogout();

  return (
    <Button
      position={"fixed"}
      top={"30px"}
      right={"30px"}
      size={"sm"}
      onClick={logout}
    >
      <FiLogOut size={20} />
    </Button>
  );
};

export default Logout;
