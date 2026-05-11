const plans = {
  strength: [
    ["Mon", "Forge", "Lower body strength and tempo sets."],
    ["Tue", "Flow Reset", "Mobility and soft tissue recovery."],
    ["Thu", "Forge", "Upper body push, pull and core."],
    ["Sat", "Velocity", "Power intervals and conditioning finisher."]
  ],
  conditioning: [
    ["Mon", "Velocity", "Short sprint blocks and sled pushes."],
    ["Wed", "Engine", "Zone two cardio and breath pacing."],
    ["Fri", "Velocity", "Partner rounds and mixed equipment."],
    ["Sun", "Flow Reset", "Restore range of motion."]
  ],
  recovery: [
    ["Tue", "Flow Reset", "Spine, hips and shoulders."],
    ["Thu", "Pilates Core", "Controlled strength with low impact."],
    ["Sat", "Walk Club", "Outdoor social session."],
    ["Sun", "Breath Lab", "Downshift and nervous system reset."]
  ]
};

const plan = document.querySelector("#plan");
const buttons = document.querySelectorAll(".goal");

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

const renderPlan = (goal) => {
  plan.innerHTML = plans[goal].map(([day, title, copy]) => `
    <article>
      <strong>${day}</strong>
      <h3>${title}</h3>
      <p>${copy}</p>
    </article>
  `).join("");
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderPlan(button.dataset.goal);
  });
});

renderPlan("strength");
setupImageFallbacks();
