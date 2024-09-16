import { useEffect, useState } from "react";
import type { RefObject } from "react";

const useGetParentElementWidth = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.parentElement?.clientWidth ?? 0);
      }
    };
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);
  return width;
};

export default useGetParentElementWidth;
