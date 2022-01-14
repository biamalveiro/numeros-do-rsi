import React from "react";

const buttonStyle =
  "inline-block px-2 py-1 text-xs text-center text-slate-500 uppercase border-2 bg-white transition duration-200 ease-in-out border-slate-500  rounded-md cursor-pointer hover:border-slate-600 hover:bg-slate-100";

export default function ChartButton({ value, label, isActive, onClick }) {
  return (
    <button
      className={`${buttonStyle} ${isActive ? "bg-slate-200" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
