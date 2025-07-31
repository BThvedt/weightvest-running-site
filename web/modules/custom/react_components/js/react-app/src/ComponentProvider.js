import React, { useState } from "react";
import ComponentContext from "./ComponentContext.js";

const ComponentProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // const toggleMenuOpen = () =>
  //   setMenuOpen((prev) => (prev === true ? false : true));

  return (
    <ComponentContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </ComponentContext.Provider>
  );
};

export default ComponentProvider;
