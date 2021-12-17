// TODO: content script
import React from "react";
import ReactDOM from "react-dom";
import { RaceCard } from "./RacePageScript";
import "./contentStyles.css";
import { QueryWrapper } from "./RQuery";

const App = () => {
  console.log("contentScript in App DOM");
  return <div id="App">{/* <h1>ContentScript writing on DOM</h1> */}</div>;
};
const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(
  <QueryWrapper>
    <App />
  </QueryWrapper>,
  root
);

const render_open_cards = () => {
  // console.log("render_open_cards");
  const open_cards = document.querySelectorAll(".buy-in-content");
  console.log("o cards", open_cards.length);
  Array.from(open_cards).map((open_card) => {
    // console.log(open_card);
    let open_card_ext = open_card.querySelector(".open_card_ext");
    // console.log(open_card_ext);
    // if (!open_card_ext) {
    open_card_ext = document.createElement("div");
    open_card_ext.classList.add("open_card_ext");
    open_card.appendChild(open_card_ext);
    // }
    ReactDOM.render(
      <QueryWrapper>
        <RaceCard {...{ open_card }} />
      </QueryWrapper>,
      open_card_ext
    );
  });
};

console.log("doc.onload");
setInterval(() => render_open_cards(), 2000);
document.addEventListener("click", () => {
  setTimeout(() => render_open_cards(), 500);
});
