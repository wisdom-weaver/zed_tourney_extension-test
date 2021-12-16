import _ from "lodash";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useQuery } from "react-query";
import ficons from "../utils/ficons";
import { dec, get_class_color, get_color } from "../utils/utils";
import { QueryWrapper } from "./RQuery";

let horse_name_sel = "div.racehorse > div.primary-text.bold";

let sn_hapi = (n) => {
  n = encodeURI(n);
  return `https://api.stackednaks.com/horses/${n}`;
};

let modes = ["cdt", "all"];
const err_chip = (
  <p style={{ background: get_color("red") }} className="racing-tag-c">
    {"err"}
  </p>
);

const get_chip_data = ({ details, hdata, mode }) => {
  let { rc, fee_tag, tun } = details;
  let stats = hdata.stats.all;
  let { firsts, seconds, thirds, fourths, other, flames } = stats;
  let tot = firsts + seconds + thirds + fourths + other;
  let p1 = dec(((firsts || 0) / (tot || 1)) * 100, 0);
  let p2 = dec(((seconds || 0) / (tot || 1)) * 100, 0);
  let p3 = dec(((thirds || 0) / (tot || 1)) * 100, 0);
  let pf = dec(((flames || 0) / (tot || 1)) * 100, 1);
  return { p1, p2, p3, tot, pf };
};

const get_chip_jsx = (chipd) => {
  return (
    <>
      {ficons.trophy}
      <span className="m2">{chipd.p1}%</span>/
      <span className="m2">{chipd.p2}%</span>/
      <span className="m2">{chipd.p3}%</span>
      {ficons.flag}
      <span className="m2">#{chipd.tot}</span>
      {ficons.flame}
      <span className="m2">{chipd.pf}%</span>
    </>
  );
};

const HorseChip = ({ name, hdata, details, mode = "all" }) => {
  if (!modes.includes(mode)) return err_chip;
  let tc = hdata?.details?.class;
  let bg = get_class_color(mode == "all" ? 6 : tc);
  let chipd = get_chip_data({ details, hdata, mode });
  let chipjsx = get_chip_jsx(chipd);
  return (
    <div style={{ background: bg }} className="racing-tag-c row-flex">
      {chipjsx}
    </div>
  );
};

const RaceHorseRow = ({ name, details }) => {
  let { status, data: hdata } = useQuery(
    ["hdata", name],
    () => fetch(sn_hapi(name)).then((r) => r.json()),
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
            <HorseChip {...{ name, details, hdata, mode: "all" }} />
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
  let racehorse_ext = racehorse_el.querySelector("div.racehorse > div.race_horse_ext")
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
