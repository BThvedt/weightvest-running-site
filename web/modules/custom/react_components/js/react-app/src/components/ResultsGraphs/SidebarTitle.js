import React, { useMemo } from "react";

export default function SidebarTitle({ children }) {
  return (
    <h3 className="font-large max-med:text-base text-lg mb-0">{children}</h3>
  );
}
