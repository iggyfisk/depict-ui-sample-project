import { ContainedPlaceholderImage, Display, Placeholder } from "@depict-ai/utilishared";

const img_aspect_ratio = 2 / 3;

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
