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
        button.classList.add('col', 'btn', 'btn3d', 'm-2', 'btn-block', 'btn-default', 'caps');
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
        modalContent.classList.add('modal-content', 'bg-blur');

        // Creates a button with class name close-modal
        let closeButtonModal = document.createElement('button');
        closeButtonModal.classList.add('btn', 'btn3d', 'btn-close', 'close-size', 'bold', 'col-2');
        closeButtonModal.addEventListener('click', hideModal);

        // Content of modal
        let modalBody = document.createElement('div');
        modalBody.classList.add('modal-body', 'pop-look');

        let titleBackground = document.createElement('div');
        titleBackground.classList.add('p-2', 'pop-look', 'text-white', 'text-center', 'd-flex', 'bg-dark');

        let infoBackground = document.createElement('div');
        infoBackground.classList.add('mt-3', 'p-2', 'pop-look', 'bg-dark', 'text-white', 'text-center');

        let title = document.createElement('h1');
        title.classList.add('col', 'm-auto', 'caps');
        title.innerText = pokemon.name;

        let weight = document.createElement('p');
        weight.innerText = 'Weight: ' + pokemon.weight;

        let height = document.createElement('p');
        height.innerText = 'Height: ' + pokemon.height;

        let type = document.createElement('p');
        type.innerText = 'Types: ' + pokemon.types;

        let ability = document.createElement('p');
        ability.innerText = 'Abilities: ' + pokemon.ability;

        // Adds the image of Pokemon to modal
        let imgBackground = document.createElement('div');
        imgBackground.classList.add('pop-look', 'mt-3', 'bg-dark');

        let img = document.createElement('img');
        img.classList.add('img-thumbnail');
        img.src = pokemon.imageUrl;
        img.alt = 'Image of ' + pokemon.name;

        // appends all Childs to Parent - Also appended in order
        titleBackground.appendChild(title);
        titleBackground.appendChild(closeButtonModal);
        modalBody.appendChild(titleBackground);
        imgBackground.appendChild(img);
        modalBody.appendChild(imgBackground);
        infoBackground.appendChild(height);
        infoBackground.appendChild(weight);
        infoBackground.appendChild(type);
        infoBackground.appendChild(ability);
        modalBody.appendChild(infoBackground);
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