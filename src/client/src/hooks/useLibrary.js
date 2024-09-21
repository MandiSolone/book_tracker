import { useContext } from "react";
import { LibraryContext } from "../contexts/LibraryContext";

const useLibrary = () => {
  const context = useContext(LibraryContext);

  // Check if context is null, indicating that the hook is used outside of the provider
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }

  return context;
};

export default useLibrary;