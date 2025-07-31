import React, { useContext } from "react";
import ComponentContext from "../ComponentContext.js";

function SlideoutMenuBtn({ title }) {
  const { menuOpen, setMenuOpen } = useContext(ComponentContext);

  return (
    <>
      <div
        className="px-md py-xs radius-md border-md border-drafult text-default cursor-pointer hover:bg-border hover:border-default-dkr hover:text-default-dkr transition-fast display-block scr:display-none mr-sm"
        onClick={() => setMenuOpen(true)}
      >
        <i className="fas fa-bars text-2xl"></i>
      </div>
    </>
  );
}

export default SlideoutMenuBtn;
