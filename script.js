window.addEventListener('DOMContentLoaded', async (event) => {
    let allPokemon = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=150")
        .then(response => response.json())

    let pokeArray = allPokemon.results;

    let togglePokemonDetails = async (e) => {
        if (!e.target.getAttribute("url")) {
            return
        }

        let singlePokemon = await fetch(e.target.getAttribute("url"))
        .then(response => response.json());

        let parent = e.target;
        if (e.target.childNodes[1] === undefined) {
            pokeName = singlePokemon.name[0].toUpperCase();
            pokeName += singlePokemon.name.substr(1);
            pokeImagesArr = singlePokemon.sprites;

            let newDiv = document.createElement('div');
            parent.appendChild(newDiv);
            parent.lastChild.innerHTML = `
                <div>Name: ${pokeName}</div>
                <img class="pokeImage" src="${pokeImagesArr.front_default}" alt="${pokeName} Pic">
            `;
        } else {
            parent.removeChild(parent.lastChild);
        }
    }

    for (let i = 0; i < pokeArray.length; i++) {
        let parent = document.createElement("div");
        let node = document.createTextNode(pokeArray[i].name);
        parent.appendChild(node);
        parent.setAttribute("url", pokeArray[i].url);
        parent.classList.add('onePokemon')
        const mainBody = document.querySelector('.body');
        mainBody.appendChild(parent);
    }

    let rows = document.querySelectorAll('.body > *');
    rows.forEach(row => row.addEventListener('click', togglePokemonDetails));
});