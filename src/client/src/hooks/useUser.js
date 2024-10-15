import { useContext } from "react";
import { UserProfileContext } from "../contexts/UserProfileContext";

const useUser = () => {
  const context = useContext(UserProfileContext);

  // Check if context is null, indicating that the hook is used outside of the provider
  if (!context) {
    throw new Error("useUser must be used within a UserProfileProvider");
  }
  return context;
};

export default useUser;
