window.onload = function () {
    const ci = new URLSearchParams(window.location.search).get("ci");

    if (!ci) {
        document.body.innerHTML = "<h1>CI no especificada en la URL.</h1>";
        return;
    }

    const script = document.createElement('script');
    script.src = `${ci}/perfil.json`;
    script.onload = function () {
        if (typeof perfil !== "object") {
            document.body.innerHTML = "<h2>El perfil no se cargó correctamente.</h2>";
            return;
        }

        document.title = perfil.nombre;
        const profile = document.querySelector('.profile');
        const picture = profile.querySelector("picture");

        picture.innerHTML = `<source media="(min-width:769px)" srcset="${ci}\/${perfil.ci}Grande.jpg"/>
                                                        <source media="(min-width:320px)" srcset="${ci}\/${perfil.ci}Pequena.jpg"/>
                                                        <img src="${ci}\/${perfil.ci}.jpg"/>`;
        picture.querySelector('img').onerror = function () {
            console.log("Picture Failed");
            perfiles.forEach(perfil => { 
                if (perfil.ci == ci) {
                    picture.innerHTML = `<img src="${perfil.imagen}"/>`;
                }
            });
        };

        profile.querySelector('div h2').innerHTML = perfil.nombre;
        profile.querySelector('#description'). innerHTML = perfil.descripcion;
        const table = document.querySelector('table');
        table.innerHTML = `<tr><td>${config.color}:</td> <td>${perfil.color}</td></tr>
                        <tr><td>${config.libro}:</td> <td>${perfil.libro}</td></tr>
                        <tr><td>${config.musica}:</td> <td>${perfil.musica.map(l => `${l}`).join(', ')}</td></tr>
                        <tr><td>${config.video_juego}:</td> <td>${perfil.video_juego.map(l => `${l}`).join(', ')}</td></tr>
                        <tr><td> <b>${config.lenguajes}:</b> </td> <td><b>${perfil.lenguajes.map(l => `${l}`).join(', ')}</b></td></tr>`;
        
        const email = document.querySelector('#email');
        const emailText = config.email.replace("[email]", `<a id="email" href="mailto:${perfil.email}">${perfil.email}</a>`);
        email.innerHTML = emailText;
    };

    script.onerror = function () {
        document.body.innerHTML = `<h2>No se encontró el perfil para la cédula: ${ci}</h2>`;
    };

    document.body.appendChild(script);
};
