let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 2.04,
        type: ['grass', 'poison']
    },
    {
        name: 'Charmander',
        height: 2,
        type: ['fire']
    },
    {
        name: 'Squirtle',
        height: 1.08,
        type: ['water']
    }
];

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height < 2.02 && pokemonList[1].height > 1.5) {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
    } else if (pokemonList[i].height < 1.5) {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
    } else {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow that\'s Big Pokemon!! ');
    }
}