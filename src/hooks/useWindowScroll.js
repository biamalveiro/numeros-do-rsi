import { useEffect, useState } from "react";

// Source https://github.com/craig1123/react-recipes/blob/master/src/useWindowScroll.js

const isClient = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

const useWindowScroll = () => {
  const [state, setState] = useState({
    x: isClient ? window.pageXOffset : 0,
    y: isClient ? window.pageYOffset : 0,
  });

  useEffect(() => {
    const handler = () => {
      setState({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });
    };

    window.addEventListener("scroll", handler, {
      capture: false,
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return state;
};

export default useWindowScroll;

// Usage

// const App = () => {
//   const { x, y } = useWindowScroll();

//   return (
//     <div>
//       <div>x: {x}</div>
//       <div>y: {y}</div>
//     </div>
//   );
// };
