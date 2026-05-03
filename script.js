const pokedex = document.getElementById("pokedex");
const search = document.getElementById("search");
let allPokemon = [];

const createCard = ({ id, name, types, abilities, height, weight, stats, sprites }) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <span class="number">#${id}</span>
        <img src="${sprites.front_default}">
        <h2>${name}</h2>
        <div class="info">
            <h3>${name}</h3>
            ${types.map(t => `<span class="type">${t.type.name}</span>`).join("")}
            <p><strong>Altura:</strong> ${height}</p>
            <p><strong>Peso:</strong> ${weight}</p>
            <p><strong>HP:</strong> ${stats[0].base_stat}</p>
            <p><strong>Ataque:</strong> ${stats[1].base_stat}</p>
            <p><strong>Defensa:</strong> ${stats[2].base_stat}</p>
            <p><strong>Habilidad:</strong> ${abilities.map(a => a.ability.name).join(", ")}</p>
        </div>`;
    pokedex.appendChild(card);
};

const render = (list) => {
    pokedex.innerHTML = "";
    list.forEach(createCard);
};

async function getPokemon() {
    allPokemon = await Promise.all(
        Array.from({ length: 1025 }, (_, i) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then(r => r.json())
        )
    );
    render(allPokemon);
}

search.addEventListener("input", ({ target }) => {
    render(allPokemon.filter(p => p.name.includes(target.value.toLowerCase())));
});

getPokemon();
