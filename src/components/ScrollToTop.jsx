// components/ScrollToTop.jsx - Enhanced version
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ smooth = false, excludePaths = [], delay = 0 }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if current path should be excluded
    const shouldScroll = !excludePaths.some((path) =>
      pathname.startsWith(path)
    );

    if (shouldScroll) {
      const scrollToTop = () => {
        if (smooth) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else {
          window.scrollTo(0, 0);
        }
      };

      if (delay > 0) {
        setTimeout(scrollToTop, delay);
      } else {
        scrollToTop();
      }
    }
  }, [pathname, smooth, excludePaths, delay]);

  return null;
};

export default ScrollToTop;
