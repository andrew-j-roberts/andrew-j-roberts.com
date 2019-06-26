/**
 * useWindowDimension React custom hook
 * Usage:
 *    const { width, height } = useWindowDimension();
 */

import { useState, useEffect } from "react";

export function useWindowDimension() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const listener = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return {
    width,
    height
  };
}
