let pokemonRepository = (function () {

    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//  Gets the pokemonList
    function getAll() {
        return pokemonList;
    };

//  Adds a pokemon into pokemonList
    function add(pokemon) {
        pokemonList.push(pokemon);
    };

//  The "addListItem" function creates li and button for Pokemon names also creates event on click button
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
    };

//  Creating the modal container
    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container')

        // Cleans modal container inner html 
        modalContainer.innerHTML = '';

        // Creates a div with the class name modal
        let modal = document.createElement('div');
        modal.classList.add('modal');
        let modalInner = document.createElement('div');
        modalInner.classList.add('modal-inner');
        let modalBox = document.createElement('div');
        modalBox.classList.add('modal-box');

        // Creates a button with class name close-modal
        let closeButtonModal = document.createElement('button');
        closeButtonModal.classList.add('modal-close');
        closeButtonModal.innerText = 'Close';
        closeButtonModal.addEventListener('click', hideModal);

        // Title of the modal
        let modalTitle = document.createElement('h1');
        modalTitle.innerText = pokemon.name;

        // Content of modal
        let modalWeight = document.createElement('p');
        modalWeight.innerText = 'Weight: ' + pokemon.weight;
        let modalHeight = document.createElement('p');
        modalHeight.innerText = 'Height: ' + pokemon.height;
        let modalType = document.createElement('p');
        modalType.innerText = 'Types: ' + pokemon.types;
        let modalAbility = document.createElement('p');
        modalAbility.innerText = 'Abilities: ' + pokemon.ability;

        // Adds the image of Pokemon to modal
        let modalImg = document.createElement('img');
        modalImg.src = pokemon.imageUrl;
        modalImg.alt = pokemon.name;

        // appends all Childs to Parent - Also appended in order
        modalBox.appendChild(modalImg);
        modalInner.appendChild(modalBox);
        modalInner.appendChild(modalType);
        modalInner.appendChild(modalWeight);
        modalInner.appendChild(modalHeight);
        modalInner.appendChild(modalAbility);
        modal.appendChild(closeButtonModal);
        modal.appendChild(modalTitle);
        modal.appendChild(modalInner);
        modalContainer.appendChild(modal);

        // Adds the class is-visible to modalContainer
        modalContainer.classList.add('is-visible');
    };

    function hideModal () {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    };

//  loads the apiUrl json, runs a forEach pokemon
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
    };

//  loads the details of each pokemon
    function loadDetails (item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            hideLoadingMessage();
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = [];
                details.types.forEach(function (value) {
                    item.types.push(' ' + value.type.name);
                });
            item.ability = [];
                details.abilities.forEach(function (value) {
                    item.ability.push(' ' + value.ability.name)
                });
            item.weight = details.weight;
        }).catch(function (e) {
            console.error(e);
        });
    };

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        })
    };

//  Escape and Click of modal to hide pop-up.
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        };
    });

    let modalContainer = document.querySelector('#modal-container')
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        };
    });

//  Loading messgae
    function showLoadingMessage() {
        let show = document.querySelector('#loading');
        show.classList.add('is-visible');
        console.log('Loading');
    };

    function hideLoadingMessage() {
        let hide = document.querySelector('#loading');
        hide.classList.remove('is-visible');
        console.log('Done');
    };

//  allows you to access functions outside the IIFE
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };

})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});