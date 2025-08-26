import React, { useContext } from "react";
import ComponentContext from "../ComponentContext.js";

function ImageAndText({
  alignment,
  large_style_url,
  origonal_file_url,
  long_text,
  image_alt,
  paragraph_uuid,
  picture_id,
  image_width,
  image_height,
}) {
  const { setComponentImageData } = useContext(ComponentContext);

  const imageArr = [
    {
      src: origonal_file_url,
      alt: image_alt ? image_alt : "",
      id: picture_id,
      width: image_width,
      height: image_height,
      description: image_alt ? image_alt : "",
      srcSet: [
        { src: large_style_url, width: 480, height: 480 },
        {
          src: origonal_file_url,
          width: image_width,
          height: image_height,
        },
      ],
    },
  ];

  return (
    <>
      <div
        className={`img-and-text-paragraph display-flex flex-col-reverse scr:flex-row ${
          alignment == "right" ? "scr:flex-row" : "scr:flex-row-reverse"
        }`}
      >
        <div
          className="w-full scr:w-1/2"
          dangerouslySetInnerHTML={{ __html: long_text }}
        ></div>
        <div className="img-container w-full scr:w-1/2 mb-lg scr:mb-0">
          <img
            className="cursor-pointer"
            src={large_style_url}
            alt={image_alt}
            data-id={picture_id}
            onClick={(e) => {
              const imgData = {
                clicked: e.target.dataset.id,
                imageArr,
              };

              setComponentImageData(imgData);
            }}
          />
          <div className="caption p-sm px-md text-md background sizing-border position-absolute bottom-0 w-full text-background transition-default">
            <p>{image_alt}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageAndText;
