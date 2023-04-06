const ul = document.querySelector('[data-js="marvel"]');
const filterImput = document.querySelector("#filter");

import { createHash } from "./hash.js";
const timeStamp = Date.now().toString();
let hash = createHash(timeStamp);

const getPosts = async (param) => {
  const response = await fetch(
    `http://gateway.marvel.com/v1/public/characters?${param}
            &ts=${timeStamp}&apikey=05d5edfd3e007033ef671fef6037f850&hash=${hash}`
  );
  return response.json();
};

const herosFedd = (heros) =>
  heros.data.results
    .map(
      (item) => `
    <ul class="card ${"normal"}">
    <img class="card-image" alt=${item.name} 
    src= "${item.thumbnail.path}${"."}${item.thumbnail.extension}"/>
    <h2 class="card-title">${item.name}</h2>
    </ul>
    `
    )
    .join("");

const searchForHeros = (heros) =>
  heros.data.results
    .map(
      (item) => `
    <li class="card ${"normal"}">
    <img class="card-image" alt=${item.name} 
    src= "${item.thumbnail.path}${"."}${item.thumbnail.extension}"/>
    <h2 class="card-title">${item.name}</h2>
    <h3 class="card-description">${item.description}</h3>
    
    </li>
    `
    )
    .join("");

const feed = async () => {
  const heros = await getPosts("orderBy=name&limit=20");
  const postsTemplate = herosFedd(heros);
  ul.innerHTML = postsTemplate;
};

const searchPerson = async (search) => {
  const heros = await getPosts(`${"name="}${search}`);
  const postsTemplate = searchForHeros(heros);
  ul.innerHTML = postsTemplate;
};

const inputFilter = (event) => {
  const inputValue = event.target.value.toLowerCase();
  if (inputValue != "") {
    searchPerson(inputValue);
  } else if (inputValue == "" || inputValue == null) {
    feed();
  }
};

feed();
filterImput.addEventListener("input", inputFilter);
