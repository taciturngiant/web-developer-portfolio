const basePrice = 840;
const state = {
  fabric: "linen",
  fabricPrice: 0,
  frame: "Oak",
  framePrice: 0,
  delivery: "Standard",
  deliveryPrice: 0
};

const price = document.querySelector("#price");
const summary = document.querySelector("#summary");
const swatches = document.querySelectorAll(".swatch");
const frame = document.querySelector("#frame");
const delivery = document.querySelector("#delivery");
const mainImage = document.querySelector("#main-image");

const setupImageFallbacks = () => {
  const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  const applyFallback = (image) => {
    image.alt = "";
    image.classList.add("image-fallback");
    if (image.src !== transparentPixel) image.src = transparentPixel;
  };

  document.querySelectorAll("img:not([data-fallback-ready])").forEach((image) => {
    image.dataset.fallbackReady = "true";
    image.addEventListener("error", () => applyFallback(image));
    if (image.complete && image.naturalWidth === 0) applyFallback(image);
  });
};

const fabricImages = {
  linen: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=80",
  moss: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=80",
  charcoal: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80"
};

const selectedPrice = (select) => Number(select.selectedOptions[0].dataset.price);

const render = () => {
  const total = basePrice + state.fabricPrice + state.framePrice + state.deliveryPrice;
  price.textContent = `$${total.toLocaleString("en-US")}`;
  summary.textContent = `${state.fabric} fabric, ${state.frame} frame, ${state.delivery} delivery. Total: $${total.toLocaleString("en-US")}.`;
  mainImage.classList.remove("image-fallback");
  mainImage.alt = "Modern lounge chair in a bright room";
  mainImage.src = fabricImages[state.fabric];
};

swatches.forEach((button) => {
  button.addEventListener("click", () => {
    swatches.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.fabric = button.dataset.fabric;
    state.fabricPrice = Number(button.dataset.price);
    render();
  });
});

frame.addEventListener("input", () => {
  state.frame = frame.value;
  state.framePrice = selectedPrice(frame);
  render();
});

delivery.addEventListener("input", () => {
  state.delivery = delivery.value;
  state.deliveryPrice = selectedPrice(delivery);
  render();
});

setupImageFallbacks();
render();
