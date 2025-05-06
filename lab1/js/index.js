const logo = document.querySelector('#logo');
logo.innerHTML = `${config.sitio[0]} <span>${config.sitio[1]}</span> ${config.sitio[2]}`;

const mid = document.querySelector('#mid');
mid.innerHTML = `${config.saludo}, ${perfiles[0].nombre}`;

const searchBar = document.querySelector('li form');
searchBar.querySelector('input').setAttribute('placeholder', `${config.nombre}...`);
searchBar.querySelector('button').innerHTML = `${config.buscar}`;

const footer = document.querySelector('footer');
footer.innerHTML = `${config.copyRight}`;

const gallery = document.querySelector('#gallery');

perfiles.forEach(perfil => {
    const galleryItem = document.querySelector('#galleryItem').content.cloneNode(true);
    galleryItem.querySelector('a').setAttribute('href', `${perfil.ci}/perfil.html`)
    galleryItem.querySelector('.galleryimg').setAttribute('src', `${perfil.imagen}`);
    galleryItem.querySelector('label').innerHTML = `${perfil.nombre}`;
    gallery.appendChild(galleryItem);
});