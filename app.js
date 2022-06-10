const pokemonCount = 25;
const pokedex = {}; // {1 : {"name": "bulbsaur"}}

window.onload = async function () {
  // Get Pokemon into DOM
  for (i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);

    // Right side info
    let pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
    pokemon.classList.add("pokemon-name");
    pokemon.addEventListener("click", updatePokemon);
    document.querySelector(".pokemon-list").appendChild(pokemon);
  }
};

// Get pokemon info from API
async function getPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
  let res = await fetch(url);
  let pokemon = await res.json();

  // Get info we need from json
  let pokemonName = pokemon["name"];
  let pokemonImg = pokemon["sprites"]["front_default"];

  // Get description info from another link
  res = await fetch(pokemon["species"]["url"]);
  let pokemonDescription = await res.json();

  pokemonDescription = pokemonDescription["flavor_text_entries"][9]["flavor_text"];

  // Makes an objetc with the info fetch from the API
  pokedex[num] = {
    name: pokemonName,
    img: pokemonImg,
    description: pokemonDescription,
  };
}

// Update pokemon info left side
function updatePokemon() {
  document.querySelector(".pokemon-img").src = pokedex[this.id]["img"];
  document.querySelector(".pokemon-name").innerText =
    pokedex[this.id]["name"].toUpperCase();
  document.querySelector(".pokemon-description").innerText =
    pokedex[this.id]["description"];
}
