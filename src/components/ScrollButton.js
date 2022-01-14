import React from "react";
import useWindowScroll from "./../hooks/useWindowScroll";

export default function ScrollButton() {
  const { y } = useWindowScroll();

  const scrollMaxY =
    window.scrollMaxY ||
    document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

  const isAtBottom = y === scrollMaxY && y > 0;

  if (isAtBottom) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      className="text-gray-500 mr-3 text-opacity-50 transform sticky"
      style={{
        top: window.innerHeight - 26,
        left: window.innerWidth / 2 - 12,
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
