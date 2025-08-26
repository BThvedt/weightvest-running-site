import React, { useState } from "react";
import ComponentContext from "./ComponentContext.js";

const ComponentProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxOpen, setLightBoxOpen] = useState(false);
  const [componentImageData, setComponentImageData] = useState(null);

  return (
    <ComponentContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        componentImageData,
        setComponentImageData,
      }}
    >
      {children}
    </ComponentContext.Provider>
  );
};

export default ComponentProvider;
