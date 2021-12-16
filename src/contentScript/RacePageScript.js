import _ from "lodash";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createImportSpecifier } from "typescript";
import { extract_class, get_fee_tag, get_tunnel } from "../utils/utils";
import { RaceHorseRowScript } from "./RaceHorseScript";

const class_sel = `div.panel__inner > div > div > div.race-info > div > div.race-description > div.race-details > div:nth-child(1) > p > span`;
const dist_sel = `div.panel__inner > div > div > div.race-info > div > div.race-description > div.race-details > div:nth-child(2) > p > span`;
const fee_sel = `div.panel__inner > div > div > div.race-info > div > div.race-status.mr-3 > div > div > h4.prize-pool > div > div > div > span`;
const free_sel = `div.panel__inner > div > div > div.race-info > div > div.race-status.mr-3 > div > div > h4.prize-pool > div > div > div > img`;
let horserows_sel = ".racehorse-row";
let horserows_cont_sel =
  "div.panel__inner > div > div > div.race-horse-list > div.list-content";

let horse_name_sel = "div.racehorse > div.primary-text.bold";

const get_race_detials = (open_card) => {
  let [class_el, dist_el, fee_el, free_el] = [
    class_sel,
    dist_sel,
    fee_sel,
    free_sel,
  ].map((qq) => open_card.querySelector(qq));
  let rc = extract_class(class_el.innerText);
  let dist = dist_el.innerText;
  dist = parseFloat(dist);
  let fee = fee_el?.innerText;
  if (fee) fee = parseFloat(fee.slice(1));
  if (!fee_el && free_el) fee = 0;
  let fee_tag = get_fee_tag(fee);
  return { rc, dist, fee, fee_tag, tun: get_tunnel(dist) };
};

const extract_horses_row_els = (open_card) => {
  let rows = open_card.querySelectorAll(horserows_sel);
  rows = Array.from(rows);
  let names = [];
  for (let row of rows) {
    let name = row.querySelector(horse_name_sel);
    name = name.innerText;
    names.push(name);
  }
  return { names, els: rows };
};

export const RaceCard = (props) => {
  let open_card = props.open_card;

  const [details, set_details] = useState({});
  const [racehorses_els, set_racehorses_els] = useState([]);
  const [racehorses_names, set_racehorses_names] = useState([]);
  useEffect(() => {
    let ob = get_race_detials(open_card);
    set_details(ob);
    // console.log("race", ob);
  }, []);
  useEffect(() => {
    if (open_card?.querySelector(horserows_cont_sel)?.childNodes == null)
      return;
    let ar = extract_horses_row_els(open_card);
    let { names, els } = ar;
    if (!_.isEqual(names, racehorses_names)) {
      set_racehorses_els(els);
      set_racehorses_names(names);
    }
  }, [open_card?.querySelector(horserows_cont_sel)?.childNodes]);

  // useEffect(() => console.log(racehorses_names), [racehorses_names]);

  useEffect(() => {
    if (_.isEmpty(racehorses_els) || _.isEmpty(details)) return;
    for (let racehorse_el of racehorses_els) {
      RaceHorseRowScript({ open_card, racehorse_el, details });
    }
  }, [racehorses_els, details]);

  useEffect(() => {
    // console.log("details", details);
  }, [details]);

  return <></>;
};

const open_card = document.querySelector(
  "#app > div > div.page-content.buy-in > main > div.accordion-container > div.accordion-content > div > div > div.panel.open"
);

// console.log(open_card);
