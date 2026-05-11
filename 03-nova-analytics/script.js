const campaigns = [
  { name: "Spring Launch", channel: "Search", status: "Live", budget: 18400, reach: 126000, conversions: 4280, roi: 182 },
  { name: "Brand Lift", channel: "Social", status: "Live", budget: 22600, reach: 219000, conversions: 3180, roi: 141 },
  { name: "Retention Flow", channel: "Email", status: "Live", budget: 7800, reach: 54000, conversions: 2920, roi: 221 },
  { name: "Creator Series", channel: "Social", status: "Review", budget: 14300, reach: 168000, conversions: 3850, roi: 166 },
  { name: "Intent Capture", channel: "Search", status: "Live", budget: 11200, reach: 91000, conversions: 2740, roi: 194 },
  { name: "Winback", channel: "Email", status: "Paused", budget: 4600, reach: 38000, conversions: 1290, roi: 118 },
  { name: "Partner Webinar", channel: "Email", status: "Live", budget: 5200, reach: 44000, conversions: 1680, roi: 176 },
  { name: "Marketplace Push", channel: "Search", status: "Review", budget: 19500, reach: 132000, conversions: 3110, roi: 153 },
  { name: "Shortform Tests", channel: "Social", status: "Live", budget: 9800, reach: 186000, conversions: 2240, roi: 137 },
  { name: "Lifecycle Upgrade", channel: "Email", status: "Live", budget: 6900, reach: 62000, conversions: 2510, roi: 204 },
  { name: "Competitor Capture", channel: "Search", status: "Paused", budget: 8700, reach: 73000, conversions: 1430, roi: 109 },
  { name: "Customer Stories", channel: "Social", status: "Live", budget: 12400, reach: 151000, conversions: 2970, roi: 188 },
  { name: "Trial Activation", channel: "Email", status: "Review", budget: 6100, reach: 47000, conversions: 2060, roi: 197 },
  { name: "Regional Expansion", channel: "Search", status: "Live", budget: 16700, reach: 104000, conversions: 2360, roi: 146 },
  { name: "Community Offer", channel: "Social", status: "Paused", budget: 7200, reach: 89000, conversions: 1510, roi: 121 },
  { name: "Annual Plan Nudge", channel: "Email", status: "Live", budget: 5800, reach: 51000, conversions: 1890, roi: 213 }
];

const table = document.querySelector("#campaign-table");
const search = document.querySelector("#search");
const channel = document.querySelector("#channel");
const bars = document.querySelector("#bars");
const viewLinks = document.querySelectorAll("[data-view-link]");
const views = document.querySelectorAll("[data-view]");
const dashboardKicker = document.querySelector("#dashboard-kicker");
const dashboardTitle = document.querySelector("#dashboard-title");
const searchControl = document.querySelector("#search-control");

const viewContent = {
  overview: {
    kicker: "marketing intelligence",
    title: "Campaign performance dashboard"
  },
  campaigns: {
    kicker: "campaign management",
    title: "Search and compare active campaigns"
  },
  insights: {
    kicker: "performance insights",
    title: "ROI trends and portfolio rationale"
  }
};

const formatNumber = (value) => new Intl.NumberFormat("en-US").format(value);

const getFilteredCampaigns = () => {
  const term = search.value.trim().toLowerCase();
  return campaigns.filter((campaign) => {
    const matchesTerm = campaign.name.toLowerCase().includes(term) || campaign.channel.toLowerCase().includes(term);
    const matchesChannel = channel.value === "all" || campaign.channel === channel.value;
    return matchesTerm && matchesChannel;
  });
};

const updateMetrics = (items) => {
  const totals = items.reduce((acc, item) => ({
    reach: acc.reach + item.reach,
    conversions: acc.conversions + item.conversions,
    roi: acc.roi + item.roi
  }), { reach: 0, conversions: 0, roi: 0 });

  document.querySelector("#reach").textContent = formatNumber(totals.reach);
  document.querySelector("#conversions").textContent = formatNumber(totals.conversions);
  document.querySelector("#roi").textContent = `${Math.round(totals.roi / Math.max(items.length, 1))}%`;
};

const render = () => {
  const items = getFilteredCampaigns();
  table.innerHTML = items.map((campaign) => `
    <tr>
      <td><strong>${campaign.name}</strong></td>
      <td><span class="tag">${campaign.channel}</span></td>
      <td><span class="status ${campaign.status.toLowerCase()}">${campaign.status}</span></td>
      <td>$${formatNumber(campaign.budget)}</td>
      <td>${formatNumber(campaign.reach)}</td>
      <td>${formatNumber(campaign.conversions)}</td>
      <td>${campaign.roi}%</td>
    </tr>
  `).join("");

  bars.innerHTML = items.map((campaign, index) => `
    <div class="bar" style="height:${Math.max(campaign.roi, 60)}px;background:${index % 3 === 0 ? "#0d9488" : index % 3 === 1 ? "#d99a18" : "#d94f70"}">
      ${campaign.roi}%
    </div>
  `).join("");

  updateMetrics(items);
};

const setView = (viewName) => {
  const nextView = viewContent[viewName] ? viewName : "overview";

  views.forEach((view) => {
    view.hidden = view.dataset.view !== nextView;
  });

  viewLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.viewLink === nextView);
  });

  dashboardKicker.textContent = viewContent[nextView].kicker;
  dashboardTitle.textContent = viewContent[nextView].title;
  searchControl.hidden = nextView === "insights";
};

viewLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const viewName = link.dataset.viewLink;
    history.pushState(null, "", `#${viewName}`);
    setView(viewName);
  });
});

window.addEventListener("popstate", () => {
  setView(location.hash.replace("#", ""));
});

[search, channel].forEach((control) => control.addEventListener("input", render));
render();
setView(location.hash.replace("#", ""));
