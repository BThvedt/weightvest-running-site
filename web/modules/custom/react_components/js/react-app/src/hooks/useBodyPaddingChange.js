import { useEffect } from "react";

function useBodyPaddingChange(callback) {
  useEffect(() => {
    const body = document.body;

    if (!body) return;

    let lastPaddingTop = getComputedStyle(body).paddingTop;

    const observer = new MutationObserver(() => {
      const currentPaddingTop = getComputedStyle(body).paddingTop;

      if (currentPaddingTop !== lastPaddingTop) {
        lastPaddingTop = currentPaddingTop;
        callback(currentPaddingTop);
      }
    });

    observer.observe(body, {
      attributes: true,
      attributeFilter: ["style", "class"], // padding might change due to inline styles or class changes
      subtree: false,
    });

    // Also run callback immediately with initial value
    callback(lastPaddingTop);

    return () => observer.disconnect();
  }, [callback]);
}

export default useBodyPaddingChange;
