import React, { useMemo } from "react";

export default function SidebarGraphWrapper({ children, showNum, randArr }) {
  if (randArr.indexOf(showNum) != -1) {
    return <div className="graph-wrapper mb-3xl max-tab:w-1/2">{children}</div>;
  } else {
    return null;
  }
}
