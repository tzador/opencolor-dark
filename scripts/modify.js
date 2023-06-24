const fs = require("fs");
const opencolor = require("./open-color");

const openColors = [];
JSON.stringify(opencolor.theme.colors).replace(/#[0-9a-fA-f]{6}/g, (m) => {
  openColors.push(m);
});

function closestColor(color) {
  let bestColor = openColors[0];
  let bestDiff = 1000000;
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);
  for (const openColor of openColors) {
    const or = parseInt(openColor.substring(1, 3), 16);
    const og = parseInt(openColor.substring(3, 5), 16);
    const ob = parseInt(openColor.substring(5, 7), 16);
    const diff = Math.max(Math.abs(r - or), Math.abs(g - og), Math.abs(b - ob));
    if (diff < bestDiff) {
      bestDiff = diff;
      bestColor = openColor;
    }
  }
  return bestColor;
}

const proto = fs
  .readFileSync("themes/OpenColor Dark-color-theme-proto.json")
  .toString();

const result = proto.replace(/#[0-9a-fA-f]{6}/g, (m) => {
  return closestColor(m);
});

fs.writeFileSync("themes/OpenColor Dark-color-theme.json", result);
