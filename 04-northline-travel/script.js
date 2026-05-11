const trips = [
  {
    key: "fjord",
    title: "Fjord Trail",
    climate: "Cool coast",
    price: 240,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80"
  },
  {
    key: "desert",
    title: "Desert Glass",
    climate: "Warm canyon",
    price: 190,
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=80"
  },
  {
    key: "forest",
    title: "Rainforest Loop",
    climate: "Green route",
    price: 215,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80"
  }
];

const grid = document.querySelector("#trip-grid");
const route = document.querySelector("#route");
const nights = document.querySelector("#nights");
const travellers = document.querySelector("#travellers");
const estimate = document.querySelector("#estimate");

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

grid.innerHTML = trips.map((trip) => `
  <article class="trip-card" data-route="${trip.key}">
    <div class="trip-media">
      <img src="${trip.image}" alt="${trip.title} landscape">
    </div>
    <div>
      <h3>${trip.title}</h3>
      <p>${trip.climate}. From <strong>$${trip.price}</strong> per person per night.</p>
    </div>
  </article>
`).join("");

const updateEstimate = () => {
  const selected = trips.find((trip) => trip.key === route.value);
  const total = selected.price * Number(nights.value) * Number(travellers.value);
  estimate.textContent = `${selected.title}: ${nights.value} nights for ${travellers.value} travellers, estimated at $${total.toLocaleString("en-US")}.`;
};

[route, nights, travellers].forEach((field) => field.addEventListener("input", updateEstimate));
setupImageFallbacks();
updateEstimate();
