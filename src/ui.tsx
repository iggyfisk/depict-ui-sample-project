import { DepictSearch, PageReplacer, SearchField, SearchPage } from "@depict-ai/ui";
import { sv } from "@depict-ai/ui/locales";
import { observer } from "@depict-ai/utilishared";
import { product_card_template } from "./product_card_template";

const depict_search = new DepictSearch({
  market: "sek",
  merchant: "hope",
  url_transformer: url_object => (url_object.pathname = "/search.html"),
  localization: {
    ...sv,
  },
});

// insert SearchField into .search-field DOM element, once it shows up
observer.onexists(".search-field", ({ element }) => element.append(...SearchField({ depict_search })));

// if search is open (pathname ends on /search.html) replace the content of the page with the search page
// this is because we want to be able to "single page navigate"/ go really quickly to the search page and be able to go from search to search without reloading the page
new PageReplacer({
  is_page_: url => url.pathname == "/search.html",
  selector_: `.replace-for-search`,
  render_: () =>
    SearchPage({
      depict_search,
      include_input_field: false,
      get_product_id: (
        href // probably can just return empty string here
      ) =>
        (href ? new URL(href) : location).pathname
          .split("/")
          .filter(v => v)
          .pop() || "",
      grid_spacing: "1%",
      cols_at_size: [[2, 900], [3, 1300], [4]],
      product_card_template,
    }),
});
