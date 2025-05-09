window.onload = function () {
    const language = new URLSearchParams(window.location.search).get("lang");
    if (!language) {
        let url = window.location.href;
        if (url.indexOf('?') > -1){
            url += 'lang=ES'
         } else {
            url += '?lang=ES'
         }
        window.location.href = url;
    }

    const configLan = document.createElement('script');
    configLan.src = `conf/config${language}.json`;
    configLan.onload = function () {

        const logo = document.querySelector('#logo');
        logo.innerHTML = `${config.sitio[0]} <span>${config.sitio[1]}</span> ${config.sitio[2]}`;

        const mid = document.querySelector('#mid');
        mid.innerHTML = `${config.saludo}, ${perfiles[0].nombre}`;

        const searchBar = document.querySelector('li form');
        searchBar.querySelector('input').setAttribute('placeholder', `${config.nombre}...`);
        searchBar.querySelector('button').innerHTML = `${config.buscar}`;

        const footer = document.querySelector('footer');
        footer.innerHTML = `${config.copyRight}`;

    }
        
    document.body.appendChild(configLan);

    function renderProfiles(perfiles) {
        const gallery = document.querySelector('#gallery');

        perfiles.forEach(perfil => {
            const galleryItem = document.querySelector('#galleryItem').content.cloneNode(true);
            galleryItem.querySelector('a').setAttribute('href', `perfil.html?ci=${perfil.ci}&lang=${language}`)
            galleryItem.querySelector('.galleryimg').setAttribute('src', `${perfil.imagen}`);
            galleryItem.querySelector('label').innerHTML = `${perfil.nombre}`;
            gallery.appendChild(galleryItem);
        });
    };

    renderProfiles(perfiles);

    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function(event) {
        const query = searchBar.value.toLowerCase();
        const results = perfiles.filter(perfil => perfil.nombre.toLowerCase().includes(query));

        const section = document.querySelector('section');
        section.innerHTML = `<ul id = "gallery"></ul>`;

        if (query == "") {
            renderProfiles(perfiles);
        }else if (results.length > 0) {
            renderProfiles(results);
        } else {
            const p = document.createElement('p');
            p.id = "no_result";
            p.innerHTML = config.no_resultado.replace('[query]', query);
            document.querySelector('section').appendChild(p);
        }
        
        event.preventDefault();
    });

    
    
};