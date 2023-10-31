# Serverul HTTP: Node.js și Express.js

## Conținut
1. [HTTP (recapitulare)](#1-http-recapitulare)

2. [Node.js](#2-nodejs)

3. [Module](#3-module)

4. [Node Package Manager](#4-node-package-manager-npm)
    1. [Fișierul package.json](#41-fișierul-packagejson)
    2. [Comenzi uzuale](#42-comenzi-uzuale)
    3. [Utilizarea pachetelor externe](#43-utilizarea-pachetelor-externe)
    
5. [Express](#5-expressjs)

6. [Structura proiectelor](#6-structura-proiectelor)
    1. [Organizarea după tip](#61-organizarea-după-tip)
    2. [Organizarea după feature](#62-organizarea-după-feature)
    3. [Organizarea proiectului curent și Express Router](#63-organizarea-proiectului-curent-și-express-router)

7. [Middlewares](#7-middlewares)


## 1. HTTP (recapitulare)
- După cum am discutat în seminarele anterioare, HTTP este un protocol de tip client-server ce funcționează printr-un schimb de mesaje inițiat de către client (un **request**), la care host-ul (cunoscut și sub denumirea de **server**) răspunde (un **response**)

    ![Arhitectură client-server](https://res.cloudinary.com/lwgatsby/f_auto/www/uploads/2023/05/client-server-network.jpg)

- Fiecare resursă disponibilă pe web se află stocată pe un server și poate fi accesată de către oricare client prin intermediul unui URL (Uniform Resource Locator) ce are structura:
    ```
    [protocol]://[domeniu]/[cale/către/resursă?parametru1=valoare1&parametru2=valoare2]

    exemplu:
    https://wikipedia.org/wiki/World_Wide_Web
    ```

- Pe lângă URL, protocolul HTTP definește o serie de metode ce descriu tipul acțiunii pe care un client o face prin intermediul unui request:
    - Cele mai cunoscute metode HTTP sunt:
        - GET - solicită o informație din partea serverului
        - POST - solicită stocarea unei informații noi pe server
        - PUT - solicită actualizarea unei informații aflate pe server
        - DELETE - solicită ștergerea unei informații de pe server
        - ([Toate metodele HTTP](https://www.w3schools.com/tags/ref_httpmethods.asp))

- După primirea unui request, serverul decide, în funcție de acțiunea invocată, dacă poate soluționa cererea clientului și asociază fiecărui response un status:
    - HTTP definește 5 categorii de statusuri ce descriu rezultatul unei acțiuni:
        - 100 - status informațional
        - 200 - acțiunea a fost făcută cu succes
        - 300 - redirecționare către o altă resursă
        - 400 - eroare de client
        - 500 - eroare de server
        - ([Toate statusurile HTTP](https://http.cat/))

- Pe parcursul următoarelor seminare vom învăța conceptele de bază ale programării web implementând o aplicație de gestionare ale unor colecții personale de filme 

- Vom începe cu definirea și implementarea serverului (*partea de back-end*) și vom crea, ulterior, o interfață web (*partea de front-end*) pe care o vom conecta la server

- Pentru implementarea ambelor părți componente vom folosi JavaScript

## 2. Node.js
- Pentru a implementa back-end-ul vom utiliza Node.js, un runtime foarte popular de JavaScript ce a permis limbajului să fie adoptat și pentru programarea aplicațiilor de tip server, pe lângă utilizarea clasică din front-end

- Definirea unui server web folosind Node.js
    ```js
    const http = require("http");

    // pentru moment, vom simula conectarea la o bază de date reală prin utilizarea unor date definite locale
    const movies = ["Synechdoche, New York", "i'm thinking of ending things", "mother!", "Aloners", "Blue Valentine"];

    http
        .createServer((req, res) => {
            res.write(JSON.stringify({records: movies}));
            res.end();
        }).listen(8080);
    ```

- Putem accesa ruta principală și, momentan, singura, navigând într-un browser la adresa http://localhost:8080 sau utilizând Postman pentru a trimite un request de tipul GET

- Deși simplu de citit și înțeles pentru moment, codul scris definește, în același fișier, atât nivelul de peristență a datelor, cât și pe cel gestionării request-urilor

- În cadrul unei aplicații complexe, acest lucru ar face codul foarte greu de scris, motiv pentru care, fiecare funcționalitate poate fi definită într-un *modul*, ce poate fi importat ulterior în alte fișiere


## 3. Module
- Un modul reprezintă o metodă de a organiza codul, împărțindu-l în mai multe structuri de complexitate mai redusă, independente și reutilizabile

- În JavaScript există 2 modalități standardizate de a defini module:
    - CommonJS - default în Node.js, folosește instrucțiunile *module.exports* și *require*
        ```javascript
        // mymodule.js
        const myFunction = () => {
        // ...
        };

        module.exports = {
            myFunction
        };

        // main.js
        const myModule = require('./mymodule');
        myModule.myFunction();
        ```

    - ECMAScript modules (ESModules) - standardul de-facto al limbajului, default pe front-end, utilizează intrucțiunile *export* și *import* 
        ```javascript
            // mymodule.js
            const myFunction = () => {
            // ...
            };

            export { myFunction };

            // main.js
            import { myFunction } from './mymodule';
            myFunction();
        ```

- În cazul nostru, vom defini un nou fișier, denumit *movies.js* în care vom defini și exporta variabila *movies*, urmând să o importăm în fișierul principal
    - Pentru început vom folosi module CommonJS în partea de back-end, urmând să actualizăm ulterior implementarea pentru a utiliza ESModules

- Aceste tipuri de module poartă denumirea de *module locale*, deoarece ne permit să exportăm și importăm cod definit în fișiere diferite într-un mod direct și rapid

- O colecție de module ce funcționează împreună și definesc o serie de funcționalități poartă denumirea de *pachet*

- Foarte important este că, pe baza acestui mecanism, putem instala și utiliza *module remote*, grupate în pachete, ce ne permit să utilizăm, în cadrul aplicației noastre, cod extern pentru a implementa diverse funcționalități 

- Sistemul oficial de gestionare a pachetelor în cadrul Node.js poartă denumirea de Node Package Manager, pe scurt, npm


## 4. Node Package Manager (npm)
- Este unul dintre cele mai mari și populare ecosisteme de pachete open-source, conținând peste *800.000* de pachete folosite de peste *17 milioane* de programatori

- Datorită rolului important pe care îl are în cadrul ecosistemului, npm este instalat implicit împreună cu node.js

- Pentru a putea importa module externe în cadrul aplicației noastre, vom inițializa un pachet folosind comanda *npm init* și completând datele cerute


### 4.1 Fișierul package.json
- După completarea pasului anterior observăm apariția, în directorul curent, a fișierului *package.json*

- Acest fișier este principalul fișier de configurare al pachetelor, el conținând informații despre:
    - numele și descrierea proiectului
    - dependențele standard și dependențele dezvoltator ale proiectului
        - dependențele dezvoltator sunt necesare doar în etapa de dezvoltare a proiectului
    - versiunea proiectului
    - scripturi 
    - detalii despre autor
    - existența unei licențe asociate proiectului
    - fișierul de intrare al aplicației

        ```json
        // exemplu de fișier package.json
        {
            "name": "exemplu-proiect",
            "version": "1.0.0",
            "description": "Primul meu proiect",
            "main": "index.js",
            "scripts": {
                // scripturile pot fi definite în acest fișier și utilizate ulterior în terminal
                // în acest exemplu, vom putea folosi comanda npm start ce va executa, de fapt, comanda node main.js
                // în general este recomandată utilizarea scripturilor, deoarece acestea pot defini comportamente mai complexe ce pot fi executate prin utilizarea unei singure comenzi 
                "start": "node main.js",
            },
            "author": "Ion Popescu",
            "license": "MIT",
            "dependencies": {
                "lodash": "1.0.0"
            },
            "devDependencies": {
                "nodemon": "1.0.0"
            }
        }
    ```

- Acest fișier este foarte important, în absența lui neputând fi gestionate importurile de pachete externe
    - Conținutul fișierul package.json este relativ dinamic, în special în zona de declarare a dependențelor, și trebuie inclus în repository-ul unui proiect, fiind parte din acesta, nu doar un fișier de configurare


### 4.2 Comenzi uzuale
- **npm install**
    - folosită pentru a instala un pachet
    - e urmată de numele pachetului, spre exemplu:
    ```
        npm install lodash
    ```
    - poate primi opțiunea "-g" pentru a face instalarea global la nivelul sistemului
    - poate primi opțiunea "-D" pentru a instala un pachet ce va fi folosit doar în dezvoltare
    - poate primi opțiunea "--save" pentru a salva o dependință în fișierul package.json_ al proiectului
        - analog, există opțiunea "--save-dev" pentru a salva o dependință de dezvoltator
- **npm uninstall**
    - folosită pentru a dezinstala un pachet
    - e urmată de numele pachetului, spre exemplu:
    ```
        npm uninstall lodash
    ```
- **npm init**
    - inițializează un proiect și creează un fișier _package.json_ cu configurările care au fost selectate după execuția comenzii
- **npm update**
    - actualizează un pachet și preia din registrul npm ultima versiune disponibilă
- **npm start**
    - lansează în execuție un proiect
- **npm publish**
    - publică un pachet în registrul npm
- **npm audit**
    - analizează pachetele instalate și determină dacă există vulnerabilități cunoscute în versiunile respective


### 4.3 Utilizarea pachetelor externe
- Pentru a observa în practică utilizarea unor pachete externe, vom instala pachetul *random* 
    ```bash
    npm install --save random
    ```

- În cadrul fișierului main.js vom adăuga gestionare suplimentar pentru rezolvarea unei noi rute ce va genera un număr aleatoriu și, în funcție de restul obținut în urma împărțirii acestuia la numărul total de filme existent în aplicație, va returna informațiile despre filmul aflat pe acea poziție în memorie (în cazul nostru în cadrul array-ului definit)
    ```javascript
    const http = require("http");
    const random = require("random");

    const { movies } = require('./movies');

    http
        .createServer((req, res) => {
            if(req.url === "/random") {
                const rnd = random.int(0, movies.length - 1);
                res.write(JSON.stringify({movie: movies[rnd]}));
            } else {
                res.write(JSON.stringify({records: movies}));
            }

            res.end();
        }).listen(8080);
    ```

- Dacă încercăm să rulăm serverul acum, vom obține o eroare: *Error [ERR_REQUIRE_ESM]*
    - Aceasta indică faptul că acest pachet nu mai poate fi importat folosind sintaxa clasică, CommonJS
    - În practică, CommonJS nu este deprecated, dar în viitorul apropiat, din ce în ce mai multe proiecte vor migra către ESModules, datorită faptului că acesta este standardul suportat de către limbaj (împreună cu alte câteva avantaje ce țin de performanță)

- Pentru a schimba tipul de module folosit din CommonJS în ESModules trebuie să:
    - Adăugăm în *package.json* proprietatea "type": "module"
    - Rescriem implementarea anterioară folosind sintaxa *import*/*export*
        ```javascript
        // main.js
        import http from "http";
        import random from "random";

        import { movies } from "./movies.js";

        http
            .createServer((req, res) => {
                if(req.url === "/random") {
                    const rnd = random.int(0, movies.length - 1);
                    res.write(JSON.stringify({movie: movies[rnd]}));
                } else {
                    res.write(JSON.stringify({records: movies}));
                }

                res.end();
            }).listen(8080);
        ```
        ```javascript
        //movies.js
        export const movies = ["Synechdoche, New York", "i'm thinking of ending things", "mother!", "Aloners", "Blue Valentine"];
        ```


## 5. Express
- Node.js este un mediu complex și foarte puternic, dar observăm că, deși simplu la prima vedere, acesta nu a fost creat în mod explicit pentru gestionarea mai multor rute (denumite și endpoint-uri), un lucru foarte comun în cadrul serverelor web, motiv pentru care adăugarea unui endpoint presupune definirea acestuia în cadrul aceleiași metode *createServer*

- În practică, modularitatea codului este o caracteristică foarte importantă, motiv pentru care, pentru a permite dezvoltatorilor să creeze servere web într-un mod mai organizat, au apărut multiple framework-uri ce pot fi folosite *on-top*, extinzând funcționalitățile runtime-ului

- Cel mai folosit framework pentru scrierea de servere web în Node.js este *express*

- Înainte de a putea folosi express, este nevoie să îl instalăm:
    ```javascript
    npm install --save express
    ```

- Folosind express, putem rescrie implementarea anterioară, având la dispoziție metode mult mai puternice de a defini endpoint-urile și implementările aferente
    ```javascript
    import express from 'express';
    import random from "random";
    import { movies } from "./movies.js";

    const PORT = 8080;

    const app = express();

    // metoda HTTP pentru care acest handler va fi atașat
    app.get("/", (req, res) => {
        // req conține detalii despre request
        // res conține detalii despre response
        res.send({ records: movies });
    });

    // în comparație cu metoda anterioară, în express nu este importantă ordinea definirii endpoint-urilor
    app.get("/random", (req, res) => {
        const rnd = random.int(0, movies.length - 1);
        res.send({ movie: movies[rnd] });
    });

    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
    ```

- După cum am menționat la început, un request HTTP poate fi de mai multe tipuri, în funcție de metoda HTTP utilizată

- În funcție de metodă, un request poate conține mai multe tipuri de date ce sunt procesate de către server în vederea generării unui răspuns corect

- Tipurile de date ce pot însoți un request sunt:
    - Parametri de tip query (query params)
    - Parametri de tip path (path params)
    - Parametri de tip body (body params)

- În cazul request-urilor de tip GET, ce are ca scop obținerea unor informații de pe server, putem folosi parametrii query și path:
    - Parametrii de tip query sunt definiți la finalul URL-ului, prin marcajul specific *?numeParametru=valoare*
    - Parametrii de tip path sunt parte a URL-ului și identifică unic resursa cerută *movie/1*

- Parametrii query atunci când informăm serverul cu privire la niște variabile de care trebuie să țină cont atunci când realizează operațiunea
    ```javascript
    // va răspunde unui request de tipul http://localhost:8080/search?title=moth
    app.get("/search", (req, res) => {
        // accesul parametrilor de tip query
        const requestedTitle = req.query.title;
        const identifiedMovie = movies.find(movie => movie.includes(requestedTitle));

        if (!!identifiedMovie) {
            res.send({ movie: identifiedMovie });
        } else {
            // ne amintim că fiecare response are un status atașat ce informează clientul cu privire la 
            //  tipul răspunsului
            res.status(404).send({ message: "Movie not found" });
        }
    });
    ```

- Spre diferență de aceștia, parametrii de tip path sunt utilizați pentru a identifica unic o entitate la nivelul serverului
    ```javascript
    app.get("/:id", (req, res) => {
        // accesul parametrilor de tip path
        const id = req.params.id;
        // vom considera ca id-ul este indexul elementului în cadrul array-ului movies
        const identifiedMovie = movies[id];

        if(!!identifiedMovie) {
            res.send({movie: identifiedMovie});
        } else {
            res.status(404).send({ message: "Movie not found" });
        }
    });
    ```

- În cazul request-urilor ce au ca scop modificarea unor date existente la nivelul serverului, cum ar fi cele de tip POST, PUT sau PATCH, pe lângă parametrii de tip query și patch, putem folosi și parametri body, mult mai complecși, ce pot avea diferite formate

- "Din cauza" acestor multiple formate ce pot fi utilizate, înainte de a putea procesa body-ul unui request, trebuie să informăm express cu privire la formatul pe care îl vom folosi

- La fel ca în majoritatea aplicațiilor web, body-ul pe care îl vom transmite către server va fi structurat sub forma unui JSON, motiv pentru care trebuie să adăugăm, imediat după definirea variabilei app, instrucțiunea
    ```javascript
    app.use(express.json())
    ```

- Ulterior, vom putea implementa un endpoint care să ne permită să adăugam un film nou la lista de filme existente
    ```javascript
    // observăm utilizarea metodei post pentru a gestiona un request de tipul POST
    app.post("/", (req, res) => {
        // accesarea parametrilor de tip body
        //  ce crezi că se va întâmpla dacă am șterge linia adăugată la pasul anterior? 
        //      vom mai putea accesa parametrul title?
        const newMovie = req.body.title;

        // dacă filmul nu există deja, îl adăugăm
        if(!movies.includes(newMovie)) {
            movies.push(newMovie);
        }

        res.status(201).send({result: "Movie was created"});
    });
    ```

- **Folosind exemplele anterioare, încearcă să definești singur două endpoint-uri noi:**
    - primul va modifica numele unui film cu o valoare primită ca parametru
    - al doilea va șterge un film, după nume, din lista de filme
    - pe lângă implementarea corectă a celor două operații, trebuie să alegi și metodele HTTP corecte - folosește seminarul anterior (sau Internetul) pentru a înțelege ce metode trebuie să folosești

- Deși express ne ajută să definim rutele într-un format mai organizat, în mod implicit, vom ajunge să implementăm toată aplicația în cadrul unui singur fișier, lucru ce nu este recomandat, ținând cont că acesta va deveni foarte greu de citit pe măsură ce aplicația este dezvoltată

- Pentru organizarea proiectelor back-end există 2 variante principale: *organizarea după tip* și *organizarea după feature*

## 6. Structura proiectelor

### 6.1 Organizarea după tip
- În acest model de organizare, codul sursă este grupat și organizat în funcție de tipul componentelor 

- De obicei, aceste tipuri includ:
    - **director pentru modele (models)**
        - descrierea entităților utilizate în aplicație
    - **director pentru controllere (controllers)**
        - logica de gestionare a cererilor HTTP și manipularea datelor din modele
    - **director pentru rute (routes)**
        - legătura dintre cererile HTTP și controllere
        - rutele stabilesc cum sunt gestionate diferitele cereri la nivel de URL și direcționează către controllerul potrivit
    - **director pentru servicii (services)**
        - metode ce implementează funcționalități complexe și sunt reutilizate în cadrul controllerelor
        ```
            app/
            ├── controllers/
            │   └── movies.js
            ├── models/
            │   └── movies.js
            ├── routes/
            │   └── movies.js
            ├── main.js
            └── package.json
        ```

### 6.2 Organizarea după feature
- În acest model, codul este grupat în funcție de caracteristicile sau funcționalitățile aplicației
    ```
        app/
        ├── auth/
        │   ├── controller.js
        │   ├── model.js
        │   └── routes.js
        ├── main.js
        └── package.json
    ```

- În acest exemplu putem observa cum pentru un feature legat de gestionarea filmelor, ce are atribuit propriul său director independent în structura aplicației, există un controller, un model și un fișier de definire a rutelor specifice

### 6.3 Organizarea proiectului curent și Express Router
- În cadrul seminarului vom organiza proiectul **după tip**, rescriind aplicația curentă astfel încât să respecte structura afișată anterior
    ```
        app/
        ├── controllers/
        │   └── movies.js
        ├── models/
        │   └── movies.js
        ├── routes/
        │   └── movies.js
        ├── main.js
        └── package.json
    ```

- Pentru a putea separa rutele de controllere și a le importa, ulterior, în fișierul principal, vom folosi *Express Router*, cu ajutorul căruia vom putea împărți fișierul main.js în 3 fișiere distincte:
    - routes/movies.js
        ```javascript
        import express from 'express';
        import * as movieController from "../controllers/movies.js";

        export const router = express.Router();

        router.get("/", (req, res) => {
            res.send({ records: movieController.getMovies() });
        });

        router.get("/random", (req, res) => {
            res.send({ movie: movieController.getRandomMovie() });
        });

        router.get("/search", (req, res) => {
            const identifiedMovie = movieController.search(req.query.title);

            if (!!identifiedMovie) {
                res.send({ movie: identifiedMovie });
            } else {
                // ne amintim că fiecare response are un status atașat ce informează clientul cu privire la 
                //  tipul răspunsului
                res.status(404).send({ message: "Movie not found" });
            }
        });

        router.get("/:id", (req, res) => {
            const identifiedMovie = movieController.getById(req.params.id);

            if (!!identifiedMovie) {
                res.send({ movie: identifiedMovie });
            } else {
                res.status(404).send({ message: "Movie not found" });
            }
        });

        router.post("/", (req, res) => {
            movieController.create(req.body.title);
            res.status(201).send({ result: "Movie was created" });
        });

        // other routes
        ```

    - controllers/movies.js
        ```javascript
        import random from "random";
        import { movies } from "../models/movies.js";

        const getMovies = () => {
            return movies;
        };

        const getRandomMovie = () => {
            const rnd = random.int(0, movies.length - 1);
            return movies[rnd];
        };

        const search = (title) => {
            return movies.find(movie => movie.includes(title));
        };

        const getById = (id) => {
            return movies[id];
        };

        const create = (title) => {
            if (!movies.includes(title)) {
                movies.push(title);
            }
        };

        // other methods

        export {
            getMovies,
            getRandomMovie,
            search,
            getById,
            create
        }  
        ```

    - main.js
        ```javascript
        import express from 'express';
        import {router as moviesRouter} from './routes/movies.js';

        const PORT = 8080;

        const app = express();
        app.use(express.json());

        // atașarea rutelor specifice unui film
        app.use("/movie", moviesRouter);

        app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
        ```

- Obținem, astfel, un proiect mai bine organizat care, pe măsură ce vor fi adăugate funcționalități și entități noi se va extinde *pe orizontală* (mai multe fișiere), contrar exemplului anterior când s-ar fi extins *pe verticală* (un fișier foarte lung)

# 7. Middlewares
- În contextul unui server web, un middleware reprezintă o metodă intermediară ce este executată înainte ca un request să fie procesat

- În cadrul unui middleware putem implementa funcționalități specifice serverelor web, dar cu caracter general, ce pot fi integrate în mai multe endpoint-uri:
    - logging
    - autentificare
    - gestionarea erorilor

- Fiind o componentă de alt tip, vom crea un fișier ce descrie funcționalitatea middleware-ului într-un director nou denumite *middlewares*

- Folosind un middleware, putem implementa, de exemplu, o metodă care să logheze ora și path-ul pe care a fost înregistrat un request: 
    ```javascript
    // middlewares/logging.js
    export const logRequestDetails = ((req, res, next) => {
        console.log(`${new Date()}: ${req.path}`);
        next();
    });
    ```

- Pentru a aplica global, pentru fiecare request, acest middleware, îl vom importa și utiliza în main.js
    ```javascript
    import { logRequestDetails } from './middlewares/logging.js';
    ....
    app.use(logRequestDetails);
    ```

- Dacă dorim utilizarea lui doar în cadrul unui grup specific de endpoint-uri, cum ar fi movies, îl putem importa și utiliza la nivelul fișierului *routes/movies.js*
    ```javascript
    import { logRequestDetails } from '../middlewares/logging.js';
    ...
    router.use(logRequestDetails);
    ```

- Un scenariu foarte important în care un middleware este, în general, folosit este cel al autentificării
    - [Recomandare](https://www.youtube.com/watch?v=xEh6Cb1PSAg)
