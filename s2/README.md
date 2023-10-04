# Web & JavaScript 101

## Conținut
1. [Web](#1-web)
    1. [Ce este Web-ul?](#11-ce-este-web-ul)
    2. [Internet vs Web](#12-internet-vs-web)
    3. [Stocarea și partajarea fișierelor pe web](#13-stocarea-și-partajarea-fișierelor-pe-web)
    4. [HTTP](#14-http)
    5. [HTML](#15-html)
    6. [CSS](#16-css)

2. [JavaScript](#2-javascript)
    1. [Tipuri de date](#21-tipuri-de-date)
    2. [Declararea variabilelor](#22-declararea-variabilelor)
    3. [Declararea funcțiilor](#23-declararea-funcțiilor)
    4. [Prototipuri și clase](#24-protitipuri-și-clase)
    5. [Structuri de control](#25-structuri-de-control)

## 1. Web
### 1.1 Ce este Web-ul?
- World Wide Web-ul (WWW) sau, pe scurt Web-ul, este o rețea de resurse interconectate prin hyperlink-uri, ce permit utilizatorilor să navigheze de la o locație la alta

- Web-ul a fost inventat de Sir Tim Berners-Lee la finalul anilor 80, la CERN, cu scopul de a permite cercetătorilor din toată lumea să partajeze mai rapid și mai eficient documentele aflate pe computerele institutelor

### 1.2 Internet vs Web
- Pentru a discuta despre Web, trebuie ca, mai întâi, să discutăm despre Internet și să înțelegem diferența dintre cele două 

- Internetul este o rețea globală de computere interconectate ce permite transmiterea rapidă de date, indiferent de distanța fizică dintre acestea

- Din punct de vedere al dimensiunii, Web-ul este o subdiviziune a Internetului, cel din urmă fiind compus din multe alte servicii, cum ar fi e-mail, partajare de fișiere, gaming online etc.

### 1.3 Stocarea și partajarea fișierelor pe web
- Fiecare resursă disponibilă pe web se află stocată pe un computer denumit host (gazdă) și poate fi accesată de către oricare client prin intermediul unui hyperlink

- Un hyperlink are la bază o adresă cu un format standardizat care identifică unic o resursă ce poartă numele de URL (Uniform Resource Locator)

- Structura unui URL este de forma:
    ```
    [protocol]://[domeniu]/[cale/către/resursă?parametru1=valoare1&parametru2=valoare2]

    exemplu:
    https://wikipedia.org/wiki/World_Wide_Web
    ```

- **Protocolul** reprezintă un set de reguli și convenții cunoscute atât de client, cât și de host, ce permite celor două părți să comunice
    - Cel mai important protocol atunci când discutăm de web este HTTP (HyperText Transfer Protocol) 
        - HTTPS (HyperText Transfer Protocol Secure) este o extensia a protocolului HTTP ce permite transmiterea de date între un client și un host într-un mod securizat

- **Domeniul** reprezintă identificatorul unic al unui host
    - Pentru a asigura unicitatea fiecărui domeniu, un grup de entități, condusă de ICANN (The Internet Corporation for Assigned Names and Numbers), gestionează atribuirea acestora
    - De asemenea, pentru a permite unui host să organizeze mai bine datele care sunt expuse fără a necesita utilizarea mai multor domenii distincte, un URL poate conține și un subdomeniu, acesta fiind independent, din punct de vedere al conținutului, de către toate celelalte subdomenii definite pentru același host
        ```
        https://mail.google.com
        https://drive.google.com
        ``` 

- **Calea** către resurse (path) reprezintă identificatorul unic al unei resurse în cadrul unui domeniu sau subdomeniu

- Un URL poate conține și parametri, specificați în formatul cheie=valoare și separați prin simbolul &

### 1.4 HTTP
- HTTP este un protocol de tip client-server ce funcționează printr-un schimb de mesaje inițiat de către client (**request**), la care host-ul (cunoscut și sub denumirea de **server**) răspunde (**response**)

- În contextul web, clientul este, de cele mai multe ori, un **browser**

- Pe lângă URL, protocolul HTTP definește o serie de metode ce descriu tipul acțiunii pe care un client o face prin intermediul unui request

- Cele mai cunoscute metode HTTP sunt:
    - GET - solicită o informație din partea serverului
    - POST - solicită stocarea unei informații noi pe server
    - PUT - solicită actualizarea unei informații aflate pe server
    - DELETE - solicită ștergerea unei informații de pe server
    - ([Toate metodele HTTP](https://www.w3schools.com/tags/ref_httpmethods.asp))

- După primirea unui request, serverul decide, în funcție de acțiunea invocată, dacă poate soluționa cererea clientului și asociază fiecărui response un status

- HTTP definește 5 categorii de statusuri ce descriu rezultatul unei acțiuni:
    - 100 - status informațional
    - 200 - acțiunea a fost făcută cu succes
    - 300 - redirecționare către o altă resursă
    - 400 - eroare de client
    - 500 - eroare de server
    - ([Toate statusurile HTTP](https://http.cat/))

- În general, resursa solicitată nu reprezintă un document oarecare, ci un document cu o structură specială pe care un browser web o poate interpreta și o poate reprezenta grafic 

- Acest tip de resursă poartă denumirea de pagină web și este structurată cu ajutorul limbajului **HTML** 

### 1.5 HTML
- HTML (HyperText Markup Language) este un limbaj care permite descrierea structurii unei pagini web prin intermediul unor tag-uri specifice
    ```html
    <html>
        <head>
            <title>Webtech 2023</title>
        </head>
        <body>
            <p>Hello, Web!</p>
        </body>
    </html>
    ```

- Cele mai multe tag-uri pot conține tag-uri copil, ce trebuie definite între marcatorii de deschidere și de închidere 
    ```html
    <div> <!-- element parinte-->
        <p>element copil</p>
    </div>
    ```

- Paginile web sunt structurate sub forma unui arbore, în care nodul părinte este întotdeauna reprezentat de tag-ul **\<html>**

- Deși poate descrie cu exactitate structura unei pagini web, HTML nu poate modela aspecte grafice complexe, cum ar fi colorizarea sau poziționarea exactă a elementelor, motiv care a condus la apariția **CSS** 

### 1.6 CSS
- CSS (Cascade Style Sheets) este un limbaj descriptiv, utilizat împreună cu HTML pentru stilizarea paginilor web

- CSS poate fi utilizat pentru:
    - colorizare
    - definirea unui layout complex
    - utilizarea unor fonturi distincte
    - responsiveness
        - pagini web care se adaptează în funcție de dimensiunea ecranului pe care sunt încărcate
    - animații simple și tranziții

- CSS poate fi definit direct în interiorul unui fișier HTML
    ```html
    <html>
        <head>
            <title>Webtech 2023</title>
            <style>
                p {
                    color: red;
                }
            </style>
        </head>
        <body>
            <p>Hello, Web!</p>
        </body>
    </html>
    ```

- Pentru o mai bună separare a codului, CSS poate fi extras într-un fișier extern și importat în fișierul HTML
    ```css
    /* fișierul styles.css */
    p {
        color: red;
    }
    ```
    ```html
    <html>
        <head>
            <title>Webtech 2023</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <p>Hello, Web!</p>
        </body>
    </html>
    ```

- Pentru a identifica exact elementele dintr-o pagină HTML, CSS poate folosi o gamă largă de metode de selectare, cele mai importante fiind:
    - selecția pe bază de tip
        ```css
        p {
            color: red;
        }
        ```
    - selecția pe bază de clasă
        ```css
        .paragraph {
            color: red;
        }
        ```
        ```html
        <p class="paragraph">Hello web</p>
        ```
    - selecția pe bază de identificator
        ```css
        #first-paragraph {
            color: red;
        }
        ```
        ```html
        <p id="first-paragraph">Hello web</p>
        ```

- Deși foarte utile, HTML și CSS nu sunt limbaje de programare propriu-zise și nu pot executa calcule dinamice sau comportamente complexe

- Din acest motiv, limbajul **JavaScript**, definit inițial ca un limbaj simplu de scripting, a fost introdus împreună cu HTML și CSS, toate cele trei tehnologii fiind *necesare* în orice browser modern

## 2. JavaScript
- JavaScript, inventat în anul 1995 de către Brendan Eich, este un limbaj de nivel înalt, interpretat, dinamic, orientat-obiect, creat special pentru a defini comportamente complexe în cadrul paginilor web

- În 2023, [98.8%](https://w3techs.com/technologies/details/cp-javascript) dintre website-urile existente utilizează JavaScript

- JavaScript este un limbaj de programare foarte puternic, ce este folosit în prezent atât în browser, cât și pe server

### 2.1 Tipuri de date
- În JavaScript există 7 tipuri de date primitive
    - Number - număr întreg sau zecimal
    - String - șir de caractere 
    - Boolean - valoare binară true/false
    - undefined - valoare default a variabilelor ce sunt declarate, dar nu inițializate
    - null - reprezintă absența explicită a unei valori
    - Symbol - valoare unică și imutabilă 
    - BigInt - număr întreg de dimensiuni foarte mari
        
- Recomandare - diferența între undefined și null: https://www.geeksforgeeks.org/undefined-vs-null-in-javascript/

- Cu excepția primitivelor, JavaScript folosește referințe pentru a ține evidența tuturor celorlalte variabile, cum ar fi:
    - Obiecte
    - Array-uri
    - Funcții
    - etc

- JavaScript definește o clasificarea particulară a valorilor ce pot fi considerate *truthy* sau *falsy*
    - Recomandare: mai multe detalii aici: https://www.30secondsofcode.org/js/s/truthy-falsy-values/ 

### 2.2 Declararea variabilelor
- Variabilele pot fi declarate folosind 3 keyword-uri diferite:
    - let 
        - definește o variabilă la nivelul unui bloc de execuție
        - nu poate fi redeclarată în același bloc de execuție
            ```javascript
            let y = "y";
            ```

    - const 
        - definește o constantă la nivelul unui bloc de execuție
        - necesită inițializare la declarare
        - nu poate fi redeclarată în același bloc de execuție
            ```javascript
            const x = "x";
            ```

    - var 
        - definește o variabilă la nivelul unei funcții
        - poate fi redeclarată
        - nu este recomandată folosirea
            ```javascript
            var z = "z";
            ```

- JavaScript prezintă mecanismul de **hoisting**, ce face ca declararea variabilelor și a funcțiilor să fie mutată la începutul blocului/funcției din care fac parte (sau la începutul blocului global, dacă are loc în afara unei funcții)
    ```javascript
    console.log(x); // printează undefined

    var x;
    ```
    - Recomandare - https://www.geeksforgeeks.org/javascript-hoisting/

- În cazul variabilelor declarate folosind let sau const, mecanismul de hoisting se aplică, dar valorile nu sunt inițializate ca undefined, ci va fi aruncată o excepție
    ```javascript
    console.log(x); // aruncă o eroare de tipul ReferenceError

    let x = 10;
    ```

- Obiectele pot fi declarate în mai multe moduri, cel mai simplu fiind prin folosirea unor literali
    ```javascript
    const myCar = {
        color: 'red',
        year: 2020,
        brand: 'Toyota'
    }

    console.log(myCar.color);
    console.log(myCar['color']); // printează aceeași valoare
    ```

### 2.3 Declararea funcțiilor
- Declararea se poate face folosind keyword-ul function
    ```javascript
    function plus(a, b) {
        return a + b;
    }

    console.log(plus(5, 6));
    ```

- Funcțiile sunt *first-class objects*, adică pot fi stocate în variabile și pasate ca parametru către alte funcții
    ```javascript
    const operation = function(param1, param2, op) {
        return op(param1, param2);
    }

    const plus = function(a, b) {
        return a + b;
    }

    console.log(operation(5, 6, plus));
    ```

- De asemenea, o funcție poate fi declarată printr-o expresie de tipul arrow function, principala diferență față de o funcție clasică fiind aceea că, dacă vom declara un arrow function într-o clasă, aceasta nu va putea accesa instanța obiectului prin keyword-ul this
    ```javascript
    const plus = (a, b) => {
        return a + b;
    };

    console.log(plus(5, 6));
    ```

- Funcțiile pot fi declarate inclusiv la inițializarea unui obiect, ca parte a acestuia
    ```javascript
    const myCar = {
        color: 'red',
        year: 2020,
        brand: 'Toyota',
        doSomething: (a) => {
            console.log("do " + a)
        }
    }

    console.log(myCar.doSomething("javascript"));
    ```

### 2.4 Protitipuri și clase
- JavaScript este un limbaj orientat obiect ce are la bază conceptul de *prototip*, spre diferență de limbajele orientate obiect clasice cum ar fi Java ce utilizează conceptul de clasăs

- Prototipul unui obiect reprezintă un obiect părinte folosit pentru a extinde proprietățile și metodele
    ```javascript
    // Funcție constructor folosită pentru crearea unui obiect de tipul Person
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }

    // Extinderea prototipului Person prin adăugarea unei funcții
    Person.prototype.greet = function() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    };

    // Crearea unor instanțe 
    const person1 = new Person("Alice", 30);
    const person2 = new Person("Bob", 25);

    person1.greet();
    person2.greet();
    ```

- Prototipul unui obiect poate fi setat și accesat în mod direct folosind proprietatea _proto_, însă acest lucru **nu este recomandat**
    ```javascript
    const car = {
    color: "red"
    };

    const volkswagen = {
    engine: "v8"
    }

    volkswagen._proto_ = car;
    console.log(volkswagen.color);
    ```

- Relativ recent, a fost adăugat suport pentru definirea formală a claselor, însă acestea folosesc, la bază, prototipuri, fiind o formă de [*syntactic sugar*](https://en.wikipedia.org/wiki/Syntactic_sugar#:~:text=In%20computer%20science%2C%20syntactic%20sugar,style%20that%20some%20may%20prefer.)
    ```javascript
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
       }

        greet() {
            console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`)
        }
    }

    const pers = new Person("John", 25);
    pers.greet();
    ```

### 2.5 Structuri de control
- Din punct de vedere al structurilor de control, JavaScript se aseamănă cu orice alt limbaj de nivel înalt, atât prin tipul structurilor, cât și prin sintaxă

- Structuri alternative
    ```javascript
    const x = 5;

    if(x < 5) {
        console.log("lower than 5");
    // in JavaScript, comparațiile se pot face atât prin == cât și prin ===
    // caută pe Internet diferența dintre ele
    // care este varianta recomandată?
    } else if(x === 5) {
        console.log("it's a 5!");
    } else {
        console.log("it's bigger than 5")
    }

    switch(x) {
        case 5: 
            console.log("It's a 5!");
            break;
        default:
            console.log("It's other value..");
    }

    const y = x === 5 ? "it's 5" : "it's not 5";
    console.log(y);
    ```
    - Recomandare - structuri alternative secundare: https://dev.to/saran_chakravarthi/javascript-demystified-short-circuiting-nullish-coalescing-and-optional-chaining-1e4n

- Structuri repetitive
```javascript
    let x = 0;

    // similar do .. while
    while(x < 5) {
        console.log("still lower than 5");
        x++;
    }

    for(let i = 0; i < 5; i++) {
        console.log("Increasing to 5");
    }

    // inițializarea unui array, vom discuta mai multe în seminarul următor
    const arr = [1, 2, 3, 4];
    for(const nm of arr) {
        console.log(nm);
    }

    // iterarea proprietăților unui obiect
    const obj = {name: "John", age: 23};
    for(const key in obj) {
        console.log(`${key}: ${obj[key]}`);
    }
    ```
