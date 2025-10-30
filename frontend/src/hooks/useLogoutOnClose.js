import { useEffect } from "react";

export default function useLogoutOnClose() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      navigator.sendBeacon("http://localhost:8000/logout");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
}