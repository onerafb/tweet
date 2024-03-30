import bcryptjs from "bcryptjs";

export const hashString = async (useValue) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedpassword = await bcryptjs.hash(useValue, salt);
  return hashedpassword;
};

