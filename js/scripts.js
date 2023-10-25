let pokemonRepository = (function () {

    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 2.04,
            type: ['Grass', 'Poison']
        },
        {
            name: 'Charmander',
            height: 2,
            type: ['Fire']
        },
        {
            name: 'Squirtle',
            height: 1.08,
            type: ['Water']
        }
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');

        let listItem = document.createElement('li');

        let button = document.createElement('button');

        button.innerText = pokemon.name;

        button.classList.add('pokemon-button');

        listItem.appendChild(button);

        pokemonList.appendChild(listItem);

        button.addEventListener('click', function () {
            showDetails(pokemon);
        })
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }


    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails
    }

})();

console.log(pokemonRepository.getAll());

pokemonRepository.add({name: 'Pikachu', height: 1.05, type: ['Eletric'] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});