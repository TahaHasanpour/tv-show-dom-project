/* https://api.tvmaze.com/shows/269/episodes */

// const video = document.querySelector('video');

// video.style.position ='fixed';

//--- header tag lists created ---
const header = document.createElement("header");
document.body.append(header);

const h1 = document.createElement("h1");
header.append(h1);
h1.textContent = "Peaky Blinders";
const nav = document.createElement("nav");
header.append(nav);
nav.setAttribute("class", "input-area");
const input = document.createElement("input");
input.setAttribute("class", "search-input");
input.setAttribute("type", "search");
input.setAttribute("name", "");
input.setAttribute("placeholder", "search...");
const select = document.createElement("select");
const option = document.createElement("option");
option.textContent = "All - Episode";
select.append(option);
nav.append(input);
nav.append(select);

//--- header tag lists created ---

//--------------------------------//

//--- main tag lists created -----
const main = document.createElement("main");
document.body.append(main);
// const video = document.createElement("video");

//-------------------------------------//

const cardArea = document.createElement("section");
cardArea.setAttribute("class", "card-area");

main.append(cardArea);

// ------------ get data from api -----------

const fetchData = async () => {
  const data = await fetch("https://api.tvmaze.com/shows/269/episodes");
  return data.json();
};
// ------------ get data from api -----------

//------- using data ------

fetchData()
  .then((data) => {
    for (let info of data) {
      //   console.log(info);
      const option = document.createElement("option");
      option.textContent = `S0` + info.season + `-` + info.name;

      select.append(option);
      const card = document.createElement("section");
      card.setAttribute("class", "card");
      cardArea.append(card);

      const img = document.createElement("img");
      img.setAttribute("src", info.image.medium);

      img.setAttribute("alt", `S${info.season} - ${info.name}`);

      img.setAttribute("title", `S${info.season} - ${info.name}`);

      const p = document.createElement("p");
      p.setAttribute("class", "runTime");

      p.textContent = `RunTime :${info.runtime}`;

      const span = document.createElement("span");
      span.setAttribute("class", "episodeName");
      span.textContent = `S0${info.season} - ${info.name}`;

      const anchor = document.createElement("a");

      anchor.append(span);
      anchor.setAttribute("href", info.url);
      anchor.classList.add("link-color");
      // span.setAttribute()

      const details = document.createElement("details");
      card.append(img, p, anchor, details);

      const summary = document.createElement("summary");
      details.append(summary);
      summary.textContent = `StoryLine`;
      const newPTag = document.createElement("p");
      details.append(newPTag);
      newPTag.textContent = info.summary.replaceAll(`<p>`, "").replaceAll(`</p>`, "");

      input.addEventListener("input", function (e) {
        let searchTerm = e.target.value;
        if (
          `s0${info.season}-Episode ${info.number}`.toUpperCase().includes(searchTerm.toUpperCase()) ||
          info.summary.toUpperCase().replaceAll("<p>", "").replaceAll("</p>", "").includes(searchTerm.toUpperCase())
        ) {
          card.classList.remove("display-none");
        } else {
          card.classList.add("display-none");
        }
      });

      select.addEventListener("change", function (e) {
        if (e.target.value === "All - Episode") {
          card.classList.remove("display-none");
        } else if (e.target.value.includes(`S0` + info.season + `-` + info.name)) {
          card.classList.remove("display-none");
        } else if (!e.target.value.includes(`S0` + info.season + `-` + info.name)) {
          card.classList.add("display-none");
        }
      });
    }
  })
  .catch(() => {
    console.error("something happend");
  });
