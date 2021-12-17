import _ from "lodash";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useQuery } from "react-query";
import ficons from "../utils/ficons";
import { dec, get_class_color, get_color } from "../utils/utils";
import { QueryWrapper } from "./RQuery";
import qs from "query-string";

let horse_name_sel = "div.racehorse > div.primary-text.bold";

// const backend = "http://localhost:3001";
const backend = "https://api.stackednaks.com";

let sn_hapi = (hid, details) => {
  let { c, f, t } = details;
  return `${backend}/tourney/dec25/?${qs.stringify({ c, f, t, hid })}`;
};

let type_color = (type) => {
  let c = "red";
  if (type == "CFT") c = "green";
  if (type == "CT") c = "orange";
  if (type == "T") c = "blue";
  if (type == "NA") c = "red";
  return get_color(c);
};
const err_chip = (
  <p style={{ background: get_color("red") }} className="racing-tag-c">
    {"err"}
  </p>
);
const na_chip = (
  <p style={{ background: get_color("red") }} className="racing-tag-c">
    {"No Data"}
  </p>
);

const get_chip_jsx = (d) => {
  return (
    <>
      {ficons.trophy}
      <span className="m2">{dec(d?.p1, 0)}</span>/
      <span className="m2">{dec(d?.p2, 0)}</span>/
      <span className="m2">{dec(d?.p3, 0)}</span>
      {ficons.flag}
      <span className="m2">{d?.n}</span>
      {ficons.flame}
      <span className="m2">{dec(d?.fires_per, 0)}%</span>
      {ficons.speed}
      <span className="m2">{dec(d?.max_speed, 0)}</span>
    </>
  );
};

const HorseChip = ({ name, hdata, details, mode = "all" }) => {
  if (_.isEmpty(hdata) || hdata.type == "NA") {
    console.log(name, hdata);
    return na_chip;
  }
  let bg = type_color(hdata.type);
  if (hdata.type == "NA")
    <div style={{ background: bg }} className="racing-tag-c row-flex">
      NO Data
    </div>;
  let chipjsx = get_chip_jsx(hdata.data);
  return (
    <div style={{ background: bg }} className="racing-tag-c row-flex">
      {chipjsx}
    </div>
  );
};

const RaceHorseRow = ({ name, details }) => {
  let { c, f, t } = details;
  let { status, data: hdata } = useQuery(
    ["hdata", name, c, f, t],
    () => fetch(sn_hapi(name, details)).then((r) => r.json()),
    { staleTime: 1e14 }
  );
  // useEffect(() => {
  //   if (status == "success") console.log("st", name, hdata);
  // }, [status]);
  return (
    <>
      <div className="row-flex">
        {status == "error" && err_chip}
        {status == "loading" && (
          <p style={{ background: get_color("blue") }} className="racing-tag-c">
            ...
          </p>
        )}
        {status == "success" && (
          <>
            <HorseChip {...{ name, details, hdata }} />
            {/* <HorseChip {...{ name, details, hdata, mode: "cdt" }} /> */}
          </>
        )}
        <p className="txt m2">{name}</p>
      </div>
    </>
  );
};

export const RaceHorseRowScript = ({ open_card, racehorse_el, details }) => {
  if (!racehorse_el || !open_card || _.isEmpty(details)) return;
  let name = racehorse_el.querySelector(horse_name_sel);
  name.style.display = "none";
  name = name.innerText;
  racehorse_el.classList.add("racehorse-row-c");
  let racehorse_ext = racehorse_el.querySelector(
    "div.racehorse > div.race_horse_ext"
  );
  if (!racehorse_ext) {
    racehorse_ext = document.createElement("div");
    racehorse_ext.classList.add("race_horse_ext");
    let racehorse_inel = racehorse_el.querySelector(".racehorse");
    racehorse_inel.appendChild(racehorse_ext);
  }
  ReactDOM.render(
    <QueryWrapper>
      <RaceHorseRow {...{ name, details }} />
    </QueryWrapper>,
    racehorse_ext
  );
};
