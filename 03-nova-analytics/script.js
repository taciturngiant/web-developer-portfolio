const campaigns = [
  { name: "Spring Launch", channel: "Search", reach: 126000, conversions: 4280, roi: 182 },
  { name: "Brand Lift", channel: "Social", reach: 219000, conversions: 3180, roi: 141 },
  { name: "Retention Flow", channel: "Email", reach: 54000, conversions: 2920, roi: 221 },
  { name: "Creator Series", channel: "Social", reach: 168000, conversions: 3850, roi: 166 },
  { name: "Intent Capture", channel: "Search", reach: 91000, conversions: 2740, roi: 194 },
  { name: "Winback", channel: "Email", reach: 38000, conversions: 1290, roi: 118 }
];

const table = document.querySelector("#campaign-table");
const search = document.querySelector("#search");
const channel = document.querySelector("#channel");
const bars = document.querySelector("#bars");

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

[search, channel].forEach((control) => control.addEventListener("input", render));
render();
