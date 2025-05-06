const logo = document.querySelector('#logo');
logo.innerHTML = `${config.sitio[0]} <span>${config.sitio[1]}</span> ${config.sitio[2]}`;

const mid = document.querySelector('#mid');
mid.innerHTML = `${config.saludo}, Sofía`;

const searchBar = document.querySelector('li form');
searchBar.querySelector('input').setAttribute('placeholder', `${config.nombre}...`);
searchBar.querySelector('button').innerHTML = `${config.buscar}`;

const footer = document.querySelector('footer');
footer.innerHTML = `${config.copyRight}`;

const gallery = document.querySelector('#gallery');
