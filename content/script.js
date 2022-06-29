window.addEventListener('DOMContentLoaded', async (event) => {
    let allPokemon = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=150")
        .then(response => response.json())

    let pokeArray = allPokemon.results;

    let togglePokemonDetails = async (e) => {
        let singlePokemon = await fetch(e.target.getAttribute("url"))
        .then(response => response.json());

        console.log(singlePokemon);
        
        let parent = e.target;
        if (e.target.childNodes[1] === undefined) {
            let node = document.createTextNode('heyo potato');
            parent.appendChild(node);
        } else {
            parent.removeChild(parent.lastChild);
        }
    }

    for (let i = 0; i < pokeArray.length; i++) {
        let parent = document.createElement("div");
        let node = document.createTextNode(pokeArray[i].name);
        parent.appendChild(node);
        parent.setAttribute("url", pokeArray[i].url)
        const mainBody = document.querySelector('.body');
        mainBody.appendChild(parent);
    }

    let rows = document.querySelectorAll('.body > *');
    rows.forEach(row => row.addEventListener('click', togglePokemonDetails));
});