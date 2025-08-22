import React, { useState, useEffect, useCallback } from "react";
// import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Lightbox = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Sample images - replace with your own
  // const images = [
  //   {
  //     src: "https://picsum.photos/800/600?random=1",
  //     alt: "Beautiful landscape with mountains",
  //   },
  //   {
  //     src: "https://picsum.photos/800/600?random=2",
  //     alt: "City skyline at sunset",
  //   },
  //   {
  //     src: "https://picsum.photos/800/600?random=3",
  //     alt: "Ocean waves crashing on rocks",
  //   },
  //   {
  //     src: "https://picsum.photos/800/600?random=4",
  //     alt: "Forest path in autumn",
  //   },
  //   {
  //     src: "https://picsum.photos/800/600?random=5",
  //     alt: "Desert sand dunes",
  //   },
  //   {
  //     src: "https://picsum.photos/800/600?random=6",
  //     alt: "Snow-capped mountain peaks",
  //   },
  // ];

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goToPrevious, goToNext]);

  // Touch handling for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Gallery Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-semibold">
                  Click to view
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Lightbox Modal */}
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-60 p-2 text-white hover:text-gray-300 transition-colors duration-200"
              aria-label="Close lightbox"
            >
              {/* <X size={32} /> */}
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 p-2 text-white hover:text-gray-300 transition-colors duration-200 hover:bg-white hover:bg-opacity-20 rounded-full"
              aria-label="Previous image"
            >
              {/* <ChevronLeft size={32} /> */}
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 p-2 text-white hover:text-gray-300 transition-colors duration-200 hover:bg-white hover:bg-opacity-20 rounded-full"
              aria-label="Next image"
            >
              {/* <ChevronRight size={32} /> */}
            </button>

            {/* Main Image Container */}
            <div
              className="relative max-w-4xl max-h-full mx-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in fade-in duration-300"
              />

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                    index === currentIndex
                      ? "border-white scale-110"
                      : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
