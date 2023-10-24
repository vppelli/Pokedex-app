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

    pokemonList.forEach(function (pokemon) {
        if (pokemon.height > 2) {
            document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') ' + 'Type: ' + pokemon.type + ' - WOW That\'s a Big Pokemon! ' + '</p>');
        }else {
            document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') ' + 'Type: ' + pokemon.type + '</p>');
        }
    });

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

pokemonRepository.add({name: 'Pikachu' });

console.log(pokemonRepository.getAll());
