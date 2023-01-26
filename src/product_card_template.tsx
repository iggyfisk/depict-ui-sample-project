import { Display, Placeholder } from "@depict-ai/utilishared";

export function product_card_template(display: Display | null) {
  return [
    <a href={display?.page_url || "javascript:void(0)"} class="product-card">
      <img src={display.image_url} alt="" class="product-img" />
      <span class="text-container">
        <span class="title">{display?.title || <Placeholder height="1em" width="20ch" />}</span>
        <span class="price">{display?.sale_price || <Placeholder height="1em" width="4ch" />}</span>
      </span>
    </a>,
  ];
}
