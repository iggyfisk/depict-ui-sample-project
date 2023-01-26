import { ContainedPlaceholderImage, Display, Placeholder } from "@depict-ai/utilishared";

const img_aspect_ratio = 2 / 3;

// the configuration (see jsx.d.ts and babel.config.json) and jsx-runtime allows us to use JSX to create normal DOM nodes
// this is faster than parsing HTML strings and makes it much easier to template things
// It also allows creating components nicely and makes it easy to use observers and add event listeners to the created nodes (you can just save them in a variable and then add stuff to them, or use use_element or use_listener)
export function product_card_template(display: Display | null) {
  return [
    <a href={display?.page_url || "javascript:void(0)"} class="product-card">
      {display ? (
        <div style={`position:relative;width:100%;padding-bottom:${(1 / img_aspect_ratio) * 100}%`}>
          <img src={display.image_url} alt="" class="product-img depict-img-mod" loading="lazy" />
        </div>
      ) : (
        <ContainedPlaceholderImage aspect_ratio={img_aspect_ratio} />
      )}
      <span class="text-container">
        <span class="title">{display?.title || <Placeholder height="1em" width="20ch" />}</span>
        <span class="price">{display?.sale_price || <Placeholder height="1em" width="4ch" />}</span>
      </span>
    </a>,
  ];
}
