import { useEffect, useRef } from "react";

const usePevState = (state) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = state;
  });
  return ref.current;
};
export default usePevState;
