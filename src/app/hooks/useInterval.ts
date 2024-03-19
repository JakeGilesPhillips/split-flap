import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number)=> {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback function
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
    savedCallback.current && savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}