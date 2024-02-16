import { useEffect, useState } from "react";
import type { RefObject } from "react";

const useClickedOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
) => {
  const [clickedOutside, setClickedOutside] = useState(true);
  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (e: MouseEvent) => {
    if (ref.current && e.composedPath().includes(ref.current)) {
      setClickedOutside(false);
      return;
    }
    setClickedOutside(true);
  };

  return clickedOutside;
};

export default useClickedOutside;
