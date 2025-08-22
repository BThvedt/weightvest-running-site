import React from "react";
import Lightbox from "./Lightbox/LIghtbox.js";

function ImageAndText({
  title,
  alignment,
  image_title,
  image_url,
  long_text,
  image_alt,
  paragraph_uuid,
}) {
  console.log("INSIDE IMAGE AND TEXT ~~~");
  console.log({
    alignment,
    title,
    image_title,
    image_url,
    long_text,
    image_alt,
    paragraph_uuid,
  });

  const lightboxData = [
    {
      src: image_url,
      alt: image_alt ? image_alt : "",
      title: image_title ? image_title : "",
    },
  ];

  return (
    <>
      {/* <h3>Image and text!!!</h3>
      {title ? <p>title is: {title}</p> : ""} */}
      <div
        className={`display-flex ${
          alignment == "right" ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div
          className="w-1/2"
          dangerouslySetInnerHTML={{ __html: long_text }}
        ></div>
        <div className="w-1/2">
          {/* <Lightbox images={lightboxData} /> */}
          <img src={image_url} alt={image_alt} title={image_title} />
        </div>
      </div>
    </>
  );
}

export default ImageAndText;
