(function ($, Drupal) {
  Drupal.behaviors.bannerVideo = {
    attach: function (context, settings) {
      // it just seems to work better inside of document.ready!
      $(document).ready(function () {
        // Run once per context
        const elements = once(
          "myfeature",
          "#block-weightvest-running-banner",
          context
        );

        // there's only one element
        const elm = elements[0];

        if (elm) {
          const $videos = $(elm).find("video");
          const $video = $($videos.get(0));

          function initializeVid() {
            if (!$video.hasClass("loaded")) {
              $video.addClass("loaded");

              const $controlsContainer = $(elm).find(
                "#bnr-volume-and-play-btn"
              );
              const $volCtrls = $(elm).find("#bnr-volume-container");
              const $playBtn = $(elm).find(".play-btn-wrapper");
              const $pauseBtn = $(elm).find(".pause-btn-wrapper");
              const $volXBtn = $(elm).find(".vol-x-icon");
              const $volLowBtn = $(elm).find(".vol-low-icon");
              const $volHighBtn = $(elm).find(".vol-high-icon");
              const $volDial = $(elm).find("#bnr-volume-inner");

              let hidingVid = false;
              let defaultVol = 0.4; // 0 - 1

              // show the controls
              $controlsContainer.removeClass("opacity-0");
              $controlsContainer.addClass("opacity-100");

              // set the volume (vid starts off muted)
              $video.get(0).volume = defaultVol ** 3;

              $video.on("transitionend", function () {
                if (hidingVid) {
                  hidingVid = false;
                  $(this).get(0).currentTime = 0;
                }
              });

              $pauseBtn.on("click", function () {
                // hide, stop, and set the time to zero
                if (!hidingVid) {
                  $video.get(0).pause();
                  hidingVid = true;
                  $video.addClass("hide-me");
                  $(this).removeClass("display-block").addClass("display-none");
                  $playBtn
                    .removeClass("display-none")
                    .addClass("display-block");
                }
              });

              $playBtn.click(function () {
                $video.removeClass("hide-me");
                $video.get(0).play();
                $(this).removeClass("display-block").addClass("display-none");
                $pauseBtn.removeClass("display-none").addClass("display-block");
              });

              $volXBtn.on("click", function () {
                unMuteVol();
              });

              $volLowBtn.on("click", function () {
                muteVol();
              });

              $volHighBtn.on("click", function () {
                muteVol();
              });

              $volDial.on("click", function (e) {
                const x = e.offsetX;
                const soundDialElm = e.target;
                const style = soundDialElm.clientWidth;

                const fraction = e.offsetX / soundDialElm.clientWidth;
                const roundedFraction = fraction.toFixed(2); // returns a string

                console.log(roundedFraction);

                if ($video.get(0).muted) {
                  unMuteVol(roundedFraction);
                } else {
                  setVidVol(roundedFraction);
                }
              });

              function setVidVol(fraction) {
                if (fraction >= 0.2) {
                  if (fraction >= 0.93) {
                    fraction = 1;
                  }
                  $volDial.css("--vol-width", `${fraction * 100}%`);
                  $video.get(0).volume = fraction ** 3;
                  setSoundBtn();
                } else {
                  muteVol(true);
                }
              }

              function unMuteVol(optionalVolume) {
                const vid = $video.get(0);

                if (vid.muted) {
                  // turn on the sound

                  vid.muted = false;

                  $volXBtn
                    .removeClass("display-block")
                    .addClass("display-none");

                  setSoundBtn();

                  if (optionalVolume) {
                    setVidVol(optionalVolume);
                  }
                }

                // there is a case where the volume could be set to zero
                // so if unmuting, set to silent
                if (vid.volume == 0) {
                  setVidVol(0.2);
                }
              }

              function setSoundBtn() {
                if ($video.get(0).volume < defaultVol ** 2) {
                  $volHighBtn
                    .removeClass("display-block")
                    .addClass("display-none");

                  $volLowBtn
                    .removeClass("display-none")
                    .addClass("display-block");
                } else {
                  $volHighBtn
                    .removeClass("display-none")
                    .addClass("display-block");

                  $volLowBtn
                    .removeClass("display-block")
                    .addClass("display-none");
                }
              }

              function muteVol(setVolToZero) {
                const vid = $video.get(0);

                if (!vid.muted) {
                  vid.muted = true;
                  $volLowBtn
                    .removeClass("display-block")
                    .addClass("display-none");

                  $volHighBtn
                    .removeClass("display-block")
                    .addClass("display-none");

                  $volXBtn
                    .removeClass("display-none")
                    .addClass("display-block");
                }

                if (setVolToZero) {
                  $volDial.css("--vol-width", "0%");
                  vid.volume = 0;
                }
              }
            }
          }

          /// start the vid on canplay.. or if that event's alrady fired by the tiem this js loads
          // (which happens sometimes) then use the .readyState >= 3
          $video.on("canplay", () => {
            initializeVid();
          });

          if ($video.get(0).readyState >= 3) {
            initializeVid();
          }
        }
      });
    },
  };
})(jQuery, Drupal);
