import React, { useMemo } from "react";

export default function GraphWrapper({ children }) {
  return (
    <div className="graph-wrapper scr:w-1/4 w-1/3 max-tab:w-1/2 mb-3xl">
      {children}
    </div>
  );
}
