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

    return {
        getAll: getAll,
        add: add
    }

})();

console.log(pokemonRepository.getAll());

pokemonRepository.add({name: 'Pikachu', height: 1.05, type: ['Eletric'] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
    if (pokemon.height > 2) {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') ' + 'Type: ' + pokemon.type + ' - WOW That\'s a Big Pokemon! ' + '</p>');
    }else {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') ' + 'Type: ' + pokemon.type + '</p>');
    }
});

