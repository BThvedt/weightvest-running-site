import { useEffect } from "react";

function useWindowResize(onResize) {
  useEffect(() => {
    const handleResize = () => {
      onResize(window.innerWidth, window.innerHeight);
    };

    // Run it once on mount
    handleResize();

    // Attach listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [onResize]);
}

export default useWindowResize;
