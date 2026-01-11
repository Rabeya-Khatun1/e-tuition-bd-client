// SmoothScroll.jsx
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScroling = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => t, // linear easing
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
      smoothTouch: true,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <div ref={scrollRef}>{children}</div>;
};

export default SmoothScroling;
