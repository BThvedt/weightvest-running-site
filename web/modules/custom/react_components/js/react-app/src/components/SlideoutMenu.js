import React, { useState, useEffect, useContext } from "react";
import ComponentContext from "../ComponentContext.js";
// import useWindowResize from "../hooks/useWindowResize.js";
import useBodyPaddingChange from "../hooks/useBodyPaddingChange.js";
import SlideoutMenuLogo from "./SlideoutMenu/SlideoutMenuLogo.js";
import SlideoutMenuContents from "./SlideoutMenu/SlideoutMenuContents.js";

function SlideoutMenu({ title, menuHtml, brandingHtml }) {
  const { menuOpen, setMenuOpen } = useContext(ComponentContext);
  // const [isClosing, setIsClosing] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [padding, setPadding] = useState("0px");

  useEffect(() => {
    if (menuOpen) {
      setMenuVisible(true);
    }
  }, [menuOpen]);

  // move slideout menu out of the way of the top toolbar
  // useWindowResize((width, height) => {
  //   adjustPadding();
  // });

  useBodyPaddingChange((padding) => {
    adjustPadding();
  });

  function adjustPadding() {
    // adjust the padding to whatever ??
    const body = document.body;
    const computedStyle = window.getComputedStyle(body);
    const bodyPadding = computedStyle.paddingTop;

    setPadding(bodyPadding);
  }

  function closeIfNecessary() {
    if (menuOpen && !menuVisible) {
      setMenuOpen(false);
    }
  }

  return (
    <>
      {menuOpen && (
        <div
          id="mobile-menu-bkgrnd"
          className={`position-fixed left-0 w-full z-1 bg-background-dkr transition-default ${
            menuVisible ? "has-backdrop" : "no-backdrop"
          }`}
          onTransitionEnd={closeIfNecessary}
          onClick={() => setMenuVisible(false)}
          style={{ top: `${padding}`, height: `calc(100% - ${padding})` }}
        >
          <div
            id="mobile-menu"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`position-absolute top-0 right-0 h-full bg-background z-1 min-w-24 shadow-default-xl transition-default ${
              menuVisible ? "menu-visible" : ""
            }`}
          >
            <div
              id="mobile-top-part"
              className="mb-sm display-flex justify-between align-center border-border bb-sm px-sm py-md"
            >
              <SlideoutMenuLogo innerHtml={brandingHtml} />

              <div
                id="close-mobile"
                className="display-flex hover:text-orange cursor-pointer transition-fast"
              >
                <p
                  onClick={() => setMenuVisible(false)}
                  className="text-xl position-relative top-xs right-md"
                >
                  <i className="fas fa-times text-2xl mr-sm" />
                  <span className="position-relative bottom-xxs">Close</span>
                </p>
              </div>
            </div>

            <SlideoutMenuContents innerHtml={menuHtml} />
          </div>
        </div>
      )}
    </>
  );
}

export default SlideoutMenu;
