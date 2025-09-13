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
              // look in view--view-fields--posts.html.twib
              // and the search-api, and taxonomy-term ones
              // the data should be in the markup, plus for the tags
              // same deal
              // alert("Finish me");
              // console.log($el.data());
              // console.log($el.data("category-id"));
              let categoryId = $el.data("category-id");
              if (categoryId) {
                window.location.href = `/taxonomy/term/${categoryId}`;
              }
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

            const $this_tag_item = $(this);
            let termId = $this_tag_item.data("term-id");
            if (termId) {
              window.location.href = `/taxonomy/term/${termId}`;
            }
          });
        });
      });
    },
  };
})(jQuery, Drupal);
