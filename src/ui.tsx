import { DepictSearch, PageReplacer, SearchField, SearchPage, DepictCategory, CategoryPage, embedded_num_products } from "@depict-ai/ui";
import { sv } from "@depict-ai/ui/locales";
import { observer } from "@depict-ai/utilishared";
import { product_card_template } from "./product_card_template";

const market = "se";
const merchant = "stronger";
const localization = {
  ...sv,
  price_formatting_: {
    pre_: "",
    post_: " kr",
    decimal_places_delimiter_: ",",
    thousands_delimiter_: " ",
    places_after_comma_: "auto" as const,
  },
};

const depict_search = new DepictSearch({
  market,
  merchant,
  localization,
  url_transformer: url_object => (url_object.pathname = "/search.html"),
});

// insert SearchField into .search-field DOM element, once it shows up
observer.onexists(".search-field", ({ element }) => element.append(...SearchField({ depict_search })));

// if search is open (pathname ends on /search.html) replace the content of the page with the search page
// this is because we want to be able to "single page navigate"/ go really quickly to the search page and be able to go from search to search without reloading the page
// PageReplacer is unfortunately undocumented right now
const search_page_replacer = new PageReplacer({
  is_page_: url => url.pathname == "/search.html",
  selector_: `.replace-for-depict`,
  render_: () =>
    SearchPage({
      depict_search,
      include_input_field: false,
      get_product_id: (href) => href || "unknown",
      grid_spacing: "1%",
      cols_at_size: [[2, 900], [3, 1300], [4]],
      product_card_template,
    }),
});

if (document.location.pathname.startsWith("/cat-")) {
  const depict_category = new DepictCategory({
    market,
    merchant,
    localization,
  });
  depict_category.category_id = document.location.pathname.replace("/cat-", "");

  // insert a category page into the main content DOM element, once it shows up
  const category_page = CategoryPage({
    depict_category,
    category_title: embedded_num_products,
    get_product_id: (href) => href || "unknown",
    grid_spacing: "1%",
    cols_at_size: [[2, 900], [3, 1300], [4]],
    product_card_template,
  });
  observer.onexists(".replace-for-depict", ({ element }) => element.replaceChildren(...category_page));
}
