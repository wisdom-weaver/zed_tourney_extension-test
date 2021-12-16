import _ from "lodash";

export const extract_class = (t) => {
  t = t?.trim();
  if (t == "CLASS I") return 1;
  else if (t == "CLASS II") return 2;
  else if (t == "CLASS III") return 3;
  else if (t == "CLASS IV") return 4;
  else if (t == "CLASS V") return 5;
  else if (t == "Griffin") return 0;
  return -1;
};

let fee_tags_ob = {
  A: [25.0, 17.5, 5000],
  B: [15.0, 12.5, 17.5],
  C: [10.0, 7.5, 12.5],
  D: [5.0, 3.75, 7.5],
  E: [2.5, 1.25, 3.75],
  F: [0.0, 0.0, 0.0],
};

export const get_fee_tag = (entryfee_usd) => {
  for (let [tag, [rep, mi, mx]] of _.entries(fee_tags_ob))
    if (_.inRange(entryfee_usd, mi, mx + 1e-3)) return tag;
};

export const colors_ob = {
  green: "#308671",
  purple: "#563D6D",
  pink: "#ad3966",
  red: "#5E3846",
  yellow: "#FEE912",
  orange: "#66513E",
  neon: "#375B55",
  blue: "#326373",
  red: "#d13524",
  fire: "#FB5739",
  "dark-orange": "#CA5C20",
  "dark-purple": "#292D3E",
  gray: "#383C42",
};
export const get_color = (t) => {
  return colors_ob[t] || "";
};

const color_chart = [
  "gray",
  "purple",
  "pink",
  "orange",
  "neon",
  "blue",
  "green",
].map(get_color);
export const get_class_color = (active_class) => {
  if (active_class == "All") return get_color("green");
  return color_chart[active_class] || get_color("green");
};
export const get_tunnel = (dist) => {
  if (dist >= 1000 && dist <= 1400) return "S";
  if (dist >= 1600 && dist <= 2000) return "M";
  if (dist >= 2200 && dist <= 2600) return "D";
  return null;
};

export const dec = (n, d = 2) => {
  if (!_.isNumber(parseFloat(n))) return;
  return parseFloat(n).toFixed(d);
};