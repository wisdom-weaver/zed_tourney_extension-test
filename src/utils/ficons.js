import React from "react";

import {
  faChessKnight,
  faFire,
  faFlag,
  faFlagCheckered,
  faTachometerAlt,
  faTint,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get_color } from "./utils";

let padding = "1px 1px";
const flame = (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color("fire")} icon={faFire} />
  </span>
);
const blood = (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color("red")} icon={faTint} />
  </span>
);
const horse = (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color("green")} icon={faChessKnight} />
  </span>
);
const trophy = (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color("yellow")} icon={faTrophy} />
  </span>
);

const flag = (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color("yellow")} icon={faFlagCheckered} />
  </span>
);
const speed = (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color("yellow")} icon={faTachometerAlt} />
  </span>
);

const ficons = {
  flame,
  blood,
  horse,
  trophy,
  flag,
  speed,
};
export default ficons;
