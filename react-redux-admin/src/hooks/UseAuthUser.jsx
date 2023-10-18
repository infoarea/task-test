import { useSelector } from "react-redux";

const UseAuthUser = () => {
  const { user } = useSelector((state) => state.auth);
  return { user };
};

export default UseAuthUser;
