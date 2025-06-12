document.addEventListener("DOMContentLoaded", function () {

    const language = new URLSearchParams(this.location.search).get("lang");
    if (!language) {
        let url = this.location.href;
        console.log(this)
        if (url.indexOf('?') > -1){
            url += 'lang=ES'
        } else {
            url += '?lang=ES'
        }
        this.location.href = url;
    }
    
    const config = fetch(`conf/config${language}.json`).then(response => response.json());
    const data = fetch('datos/index.json').then(response => response.json());
    
    Promise.all([config, data])
    .then(([config, data]) => {
        const logo = document.querySelector('#logo');
        logo.innerHTML = `${config.sitio[0]} <span>${config.sitio[1]}</span> ${config.sitio[2]}`;

        const searchForm = document.querySelector('li form');
        searchForm.querySelector('input').setAttribute('placeholder', `${config.nombre}...`);
        searchForm.querySelector('button').innerHTML = `${config.buscar}`;
        
        const mid = document.querySelector('#mid');
        mid.innerHTML = `${config.saludo}, ${data.perfiles[0].nombre}`;

        const footer = document.querySelector('footer');
        footer.innerHTML = `${config.copyRight}`;
    

        function renderProfiles(perfiles) {
            const gallery = document.querySelector('#gallery');

            perfiles.forEach(perfil => {
                const galleryItem = document.querySelector('#galleryItem').content.cloneNode(true);
                const item = galleryItem.querySelector('#item');
                item.onclick = ciCookie;
                item.setAttribute('href', `index.py?ci=${perfil.ci}&lang=${language}`)


                function ciCookie() {
                    document.cookie=`ci=${perfil.ci}`;
                    window.location.reload();
                    
                    return false;
                }
                
                galleryItem.querySelector('#galleryimg').setAttribute('src', `${perfil.imagen}`);
                galleryItem.querySelector('label').innerHTML = `${perfil.nombre}`;
                gallery.appendChild(galleryItem);
            });
        };

        renderProfiles(data.perfiles);

        const searchBar = document.getElementById('searchBar');
        const searchButton = document.getElementById('searchButton');

        searchButton.addEventListener('click', function(event) {
            const query = searchBar.value.toLowerCase();
            const results = data.perfiles.filter(perfil => perfil.nombre.toLowerCase().includes(query));

            const section = document.querySelector('section');
            section.innerHTML = `<ul id = "gallery"></ul>`;

            if (query == "") {
                renderProfiles(data.perfiles);
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
    });
    
});