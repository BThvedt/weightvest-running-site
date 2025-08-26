import React, { useState, useContext, useEffect, useRef } from "react";
import ComponentContext from "../ComponentContext.js";
import useWindowResize from "../hooks/useWindowResize.js";

function ImageGallery({ title, componentType, img_arr }) {
  const [rowHeight, setRowHeight] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [rowsSet, setRowsSet] = useState(false);
  const [rows, setRows] = useState([]);
  const [lightBoxData, setLightBoxData] = useState([]);

  const { setComponentImageData } = useContext(ComponentContext);

  const firstRowRef = useRef(null);
  let hasEvenNumber = img_arr % 2 == 0;
  const totalCount = img_arr.length;

  useEffect(() => {
    measureFirstRow();
  }, [imagesLoaded]);

  useWindowResize(() => {
    setTimeout(measureFirstRow, 10);
  });

  useEffect(() => {
    if (!rowsSet) {
      let tempRows = [];
      // let's structure the images in to rows
      // if the total number of images are even, go 2 per row
      // if the total number is odd, alternate 2 in one row, 1 in the next
      if (hasEvenNumber) {
        for (let i = 0; i < totalCount; i += 2) {
          tempRows.push(img_arr.slice(i, i + 2));
        }
      } else {
        let index = 0;
        let rowNumber = 1;

        while (index < totalCount) {
          if (rowNumber % 2 == 1) {
            const imagesForRow = img_arr.slice(index, index + 2);
            tempRows.push(imagesForRow);
            index += 2;
          } else {
            tempRows.push([img_arr[index]]);
            index += 1;
          }

          rowNumber++;
        }
      }

      // Combine last two rows if they both have length 1 and total images >= 5
      if (
        totalCount >= 5 &&
        tempRows.length >= 2 &&
        tempRows[tempRows.length - 1].length === 1 &&
        tempRows[tempRows.length - 2].length === 1
      ) {
        const lastRow = tempRows.pop();
        const secondLastRow = tempRows.pop();
        tempRows.push([...secondLastRow, ...lastRow]);
      }
      setRowsSet(true);
      setRows(tempRows);

      // new set lightbox data
      const dummyImageArr = [];
      for (let x in img_arr) {
        let {
          image_alt,
          image_height,
          image_width,
          large_style_url,
          origonal_file_url,
          picture_id,
        } = img_arr[x];

        dummyImageArr.push({
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
        });
      }

      setLightBoxData(dummyImageArr);
    }
  }, [rows, rowsSet]);

  // console.log("img arr");
  // console.log(img_arr);
  // todo: even and odd classes
  // if odd number, every 3rd one is full width
  // send data to the lightbox
  // lightbox has thumbnail gallery for multiple images (probably needs)
  // a seperate component

  // adjust the height after images are loaded
  const handleImageLoad = () => {
    setImagesLoaded((prev) => {
      const newCount = prev + 1;
      return newCount;
    });
  };

  const measureFirstRow = () => {
    if (firstRowRef.current && imagesLoaded === totalCount) {
      const height = firstRowRef.current.offsetHeight;
      setRowHeight(height);
    }
  };

  return (
    <div className="image-gallery-paragraph">
      <h2>{title}</h2>
      <div
        className={`${hasEvenNumber ? "even-number" : "odd-number"} gallery`}
      >
        {rows.map((row, i) => (
          <div
            key={i}
            ref={i === 0 ? firstRowRef : null}
            className={`${
              i % 2 == 0 && i <= rows.length - 1 ? "even" : "odd"
            } gallery-row`}
            style={{
              height: i === 0 ? "auto" : rowHeight || "auto",
            }}
          >
            {row.map((img_data, i) => (
              <img
                key={img_data.picture_id}
                src={img_data.large_style_url}
                data-id={img_data.picture_id}
                onLoad={handleImageLoad}
                className="my-xs"
                onClick={(e) => {
                  const imgData = {
                    clicked: e.target.dataset.id,
                    imageArr: lightBoxData,
                  };

                  console.log(lightBoxData);

                  setComponentImageData(imgData);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
