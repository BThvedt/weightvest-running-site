import React from "react";

// been a while.. rusty. Anyway Usuing React.memo
// Won’t re-render unless props actually change
// Prevents flickering
const SlideoutMenuLogo = React.memo(({ innerHtml }) => {
  return (
    <>
      <div id="branding-html" dangerouslySetInnerHTML={{ __html: innerHtml }} />
    </>
  );
});

export default SlideoutMenuLogo;
