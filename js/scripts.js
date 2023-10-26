let pokemonRepository = (function () {

    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//     Gets the pokemonList

    function getAll() {
        return pokemonList;
    }

//     Adds a pokemon into pokemonList

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

//     The "addListItem" function creates li and button for Pokemon names also creates event on click button
    
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
        });
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            hideLoadingMessage();
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadDetails (item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            hideLoadingMessage();
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    function showLoadingMessage() {
        console.log('Loading')
    };

    function hideLoadingMessage() {
        console.log('Done')
    };

//     allows you to access functions outside the IIFE

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    }

})();

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});