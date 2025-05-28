window.onload = function () {
    const params = new URLSearchParams(this.location.search)
    const ci = params.get("ci");
    const language = params.get("lang");

    if (!ci) {
        document.body.innerHTML = "<h2>Ups, no podemos encontrar datos de perfil.</h2>";
        console.log("Parametro CI no especificado en la URL:", this.location);
        return;
    }

    const configLan = document.createElement('script');
    configLan.src = `conf/config${language}.json`;
    configLan.onload = function () {

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
                console.log("Fallo al cargar imagen: ", this);
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
            document.body.innerHTML = "<h2>Ups, no podemos encontrar datos de perfil.</h2>";
            console.log("Directorio o archivo faltante en la ruta:", this.getAttribute('src'));
        };

        document.body.appendChild(script);
    }
    
    document.body.appendChild(configLan);
};
