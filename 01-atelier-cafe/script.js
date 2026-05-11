const dishes = [
  {
    title: "Fig Toast",
    category: "brunch",
    price: "$14",
    copy: "Whipped ricotta, honey, toasted seeds and sourdough.",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "Market Eggs",
    category: "brunch",
    price: "$16",
    copy: "Soft herbs, roasted tomato, greens and crisp potatoes.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "House Espresso",
    category: "coffee",
    price: "$4",
    copy: "Single-origin espresso with dark cherry and cocoa notes.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "Cold Brew Tonic",
    category: "coffee",
    price: "$7",
    copy: "Bright, sparkling and served over citrus ice.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "Mushroom Ragu",
    category: "evening",
    price: "$22",
    copy: "Hand-cut pasta, wild mushrooms and pecorino.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "Citrus Panna Cotta",
    category: "evening",
    price: "$10",
    copy: "Silky vanilla cream, burnt orange and pistachio.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80"
  }
];

const menuGrid = document.querySelector("#menu-grid");
const filters = document.querySelectorAll(".filter");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

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

const renderMenu = (category = "all") => {
  const selected = category === "all" ? dishes : dishes.filter((dish) => dish.category === category);
  menuGrid.innerHTML = selected.map((dish) => `
    <article class="menu-card">
      <img src="${dish.image}" alt="${dish.title}">
      <h3>${dish.title}</h3>
      <p>${dish.copy}</p>
      <span class="price">${dish.price}</span>
    </article>
  `).join("");
  setupImageFallbacks();
};

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderMenu(button.dataset.filter);
  });
});

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

const guests = document.querySelector("#guests");
const date = document.querySelector("#date");
const seating = document.querySelector("#seating");
const summary = document.querySelector("#booking-summary");

const setDefaultDate = () => {
  const tomorrow = new Date(Date.now() + 86400000);
  date.value = tomorrow.toISOString().slice(0, 10);
};

const updateSummary = () => {
  summary.textContent = `${guests.value} guests, ${seating.value}, ${date.value || "choose a date"}.`;
};

[guests, date, seating].forEach((field) => field.addEventListener("input", updateSummary));
setDefaultDate();
renderMenu();
updateSummary();
setupImageFallbacks();
