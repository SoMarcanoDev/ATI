from urllib.parse import parse_qs
from http.cookies import SimpleCookie

def application(environ, start_response):
    status = '200 OK'
    headers = [('Content-Type', 'text/html')]
    start_response(status, headers)
    
    c = SimpleCookie()
    c.load(environ.get("HTTP_COOKIE",""))
    
    if 'ci' in c:
        profile_ci = c['ci'].value
    else:
        profile_ci = False

    response_body = """ 
        <!DOCTYPE html>
        <html lang="es">
        </html>
        """

    if profile_ci:
        response_body = """ 
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title></title>
            <link rel="icon" type="image/x-icon" href="http://www.ciens.ucv.ve/portalasig2/favicon.ico">
            <link href="css/style.css" rel="stylesheet" type="text/css" media="screen" />

            <script type="text/javascript" src="js/perfil.js" defer> </script>
        </head>
        <body>
            <div>
                <a id="return" href="#"> 
                    <- Volver al inicio
                </a>
                <section class="profile">
                    <picture>
                        <source media="(min-width:769px)" srcset="">
                        <source media="(min-width:320px)" srcset="">
                        <img src="">
                    </picture>
                    <div>
                        <h2></h2>
                        <p id="description"><i> </i>
                        </p>
                        <table>
                        </table>
                        <p id ="email">
                        </p>
                    </div>
                </section>
            </div>
        </body>
        </html>
        """
    else:
        response_body = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ATI[UCV] 2025-1</title>
            <link rel="icon" type="image/x-icon" href="http://www.ciens.ucv.ve/portalasig2/favicon.ico">
            <link href="css/style.css" rel="stylesheet" type="text/css" media="screen" />
        
            <template id = "galleryItem">
                <li>
                    <a id = "item">
                        <img id = "galleryimg" src="">
                        <label></label>
                    </a>
                </li>
            </template>
        
            <script type="text/javascript" src="js/index.js" defer> </script>
        </head>
        <body>
            <header>
                <nav>
                    <ul>
                        <li id="logo">ATI<span>[UCV]</span> 2025-1</li>
                        <li id = "mid">Hola,</li>
                        <li><form action="" method="get">
                        <input type="text" id = "searchBar" placeholder="Nombre..."/> 
                        <button type="submit" id = "searchButton">Buscar</button>
                        </form></li>
                    </ul>
                </nav>
            </header>
            <section>
                <ul id = "gallery">
                
                </ul>
            </section>
            <footer> </footer>
        </body>
        </html>
        """ 
    
    return [response_body.encode("utf-8")]