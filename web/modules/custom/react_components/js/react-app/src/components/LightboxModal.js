import React, { useContext, useEffect, useState } from "react";
import ComponentContext from "../ComponentContext.js";
import Lightbox from "yet-another-react-lightbox";
import { Captions, Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function LightboxModal({ title }) {
  const [lightBoxData, setLightBoxData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const { componentImageData, setComponentImageData } =
    useContext(ComponentContext);

  useEffect(() => {
    if (componentImageData) {
      console.log("ASDF");
      const { clicked, ...imageArr } = componentImageData;

      console.log(imageArr);
      setLightBoxData(imageArr.imageArr);

      if (imageArr.imageArr.length > 1) {
        console.log(clicked);

        const index = imageArr.imageArr.findIndex((obj) => obj.id === clicked);

        setStartIndex(index);
      }
    }

    return () => {
      setLightBoxData(null);
    };
  }, [componentImageData]);

  return (
    <>
      {lightBoxData?.length == 1 && (
        <Lightbox
          plugins={[Captions]}
          open={lightBoxData?.length ? true : false}
          close={() => {
            setComponentImageData(null);
          }}
          slides={lightBoxData}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
        />
      )}
      {lightBoxData?.length > 1 && (
        <Lightbox
          plugins={[Captions, Thumbnails]}
          open={lightBoxData?.length ? true : false}
          close={() => {
            setComponentImageData(null);
          }}
          slides={lightBoxData}
          index={startIndex} // This controls which slide starts
          thumbnails={{
            position: "bottom",
            width: 120,
            height: 80,
            border: 1,
            borderRadius: 4,
          }}
        />
      )}
    </>
  );
}

export default LightboxModal;
