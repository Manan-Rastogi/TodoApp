import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-violet-500 text-white py-2">
      <span className="logo font-bold text-xl mx-5">meTask</span>
      <ul className="flex justify-between gap-9 mx-9">
        <li className="cursor-pointer hover:font-semibold">Home</li>
        <li className="cursor-pointer hover:font-semibold">MyTasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;
