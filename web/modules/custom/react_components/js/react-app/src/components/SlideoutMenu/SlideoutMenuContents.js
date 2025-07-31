import React from "react";

// been a while.. rusty. Anyway Usuing React.memo
// Won’t re-render unless props actually change
// Prevents flickering
const SlideoutMenuContents = React.memo(({ innerHtml }) => {
  return (
    <>
      <div
        id="menu-html"
        className="p-xl"
        dangerouslySetInnerHTML={{ __html: innerHtml }}
      />
    </>
  );
});

export default SlideoutMenuContents;
