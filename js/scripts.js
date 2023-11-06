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
        let pokemonList = document.querySelector('.row');

        let listItem = document.createElement('div');

        let button = document.createElement('button');
        button.classList.add('col', 'rounded-4', 'm-1', 'btn', 'btn-primary', 'btn-block');
        button.innerText = pokemon.name;

        listItem.appendChild(button);

        pokemonList.appendChild(listItem);

        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    };

    //  Creating the modal container
    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal');

        // Cleans modal container inner html 
        modalContainer.innerHTML = '';

        // Creates a div with the class name modal
        let modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog');
        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        // Title of the modal
        let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header', 'bg-light');

        let modalTitle = document.createElement('h1');
        modalTitle.classList.add('modal-title');
        modalTitle.innerText = pokemon.name;

        // Creates a button with class name close-modal
        let closeButtonModal = document.createElement('button');
        closeButtonModal.classList.add('btn');
        closeButtonModal.innerText = 'X';
        closeButtonModal.addEventListener('click', hideModal);

        // Content of modal
        let modalBody = document.createElement('div');
        modalBody.classList.add('modal-body', 'bg-primary', 'rounded-bottom-2');

        let modalBack = document.createElement('div');
        modalBack.classList.add('mt-2', 'p-2', 'rounded-4', 'bg-secondary', 'text-white', 'text-center');

        let modalWeight = document.createElement('p');
        modalWeight.innerText = 'Weight: ' + pokemon.weight;

        let modalHeight = document.createElement('p');
        modalHeight.innerText = 'Height: ' + pokemon.height;

        let modalType = document.createElement('p');
        modalType.innerText = 'Types: ' + pokemon.types;

        let modalAbility = document.createElement('p');
        modalAbility.innerText = 'Abilities: ' + pokemon.ability;

        // Adds the image of Pokemon to modal
        let modalImgBack = document.createElement('div');
        modalImgBack.classList.add('border', 'border-danger', 'rounded-4');

        let modalImg = document.createElement('img');
        modalImg.classList.add('img-thumbnail');
        modalImg.src = pokemon.imageUrl;
        modalImg.alt = 'Image of ' + pokemon.name;

        // appends all Childs to Parent - Also appended in order
        modalImgBack.appendChild(modalImg);
        modalBody.appendChild(modalImgBack);
        modalBack.appendChild(modalHeight);
        modalBack.appendChild(modalWeight);
        modalBack.appendChild(modalType);
        modalBack.appendChild(modalAbility);
        modalBody.appendChild(modalBack);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButtonModal);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalDialog.appendChild(modalContent);
        modalContainer.appendChild(modalDialog);

        // Adds the class show to modalContainer
        $('#modal').modal('toggle')
    };

    function hideModal () {
        $('#modal').modal('hide')
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
            item.imageUrl = details.sprites.other['official-artwork'].front_default;
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
        });
    };

//  Escape and Click of modal to hide pop-up.
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal');
        if (e.key === 'Escape' && modalContainer.classList.contains('show')) {
            hideModal();
        };
    });

    let modalContainer = document.querySelector('#modal')
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        };
    });

//  Loading message
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