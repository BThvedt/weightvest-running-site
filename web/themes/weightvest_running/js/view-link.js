(function ($, Drupal) {
  Drupal.behaviors.viewLinks = {
    attach: function (context, settings) {
      $(once("view-links-category", ".category-wrapper", context)).each(
        function () {
          const $el = $(this);
          // Your jQuery code here…
          $el.find(".category").each(function () {
            const $category = $(this);
            $category.click(function (e) {
              e.preventDefault();
              e.stopPropagation();
              // finish tomorrow!
            });
          });
        }
      );

      $(once("view-links-tags", ".tags-wrapper", context)).each(function () {
        const $el = $(this);
        // Your jQuery code here…
        $el.find(".tag").each(function () {
          const $tag = $(this);
          $tag.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
          });
        });
      });
    },
  };
})(jQuery, Drupal);
