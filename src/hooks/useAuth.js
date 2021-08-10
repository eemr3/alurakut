import { useContext } from "react";
import AuthContext from "../utils/contexts/AuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
