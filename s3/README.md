# Array-uri

## Conținut
1. [Concepte de bază](#1-concepte-de-bază)
    1. [Declararea unui array](#11-declararea-unui-array)
    2. [Proprietatea length](#12-proprietatea-length)
    3. [Accesarea datelor](#13-accesarea-datelor)
    4. [Manipularea datelor](#14-manipularea-datelor)
    5. [Parcurgerea unui array](#15-parcurgerea-unui-array)
    6. [Operatorul rest și operatorul spread](#16-operatorul-rest-și-operatorul-spread)
    7. [Copierea unui array](#17-copierea-unui-array)

2. [Metode utile](#2-metode-utile)

3. [Exerciții](#3-exerciții)

4. [Exemple (mai) complexe](#4-exemple-mai-complexe)



## 1. Concepte de bază
- Suportul oferit de JavaScript pentru array-uri este foarte puternic, motiv pentru care acestea pot fi utilizate cu aceeași ușurință cu care putem utiliza tipurile de date primitive, dar, este important să reținem că **array-urile nu sunt primitive**, ci au la bază obiectul Array

- Pot avea o dimensiune variabilă ce nu trebuie inițializată în momentul declarării

- Fiind un limbaj weakly typed, JavaScript permite mixarea tipurilor de date stocate la nivelul unui array
    - un array poate conține, în același timp, valorile "web", 1, 0.5, null, și {name: "John"}
    - de asemenea, JavaScript pune la dispoziția programatorilor și array-uri cu tip bine definit, cunoscute sub numele de Typed Arrays ([Recomandare](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays))

- La fel ca în alte limbaje de programare populare, index-ul de start al unui array este 0

### 1.1 Declararea unui array
- La fel ca în cazul variabilelor, declararea unui array se poate face cu keyword-urile let și const
    ```javascript
    // declararea folosind let
    let firstArray = [1, 2, 3, 4];

    // declararea folosind const
    const secondArray = [1, 2, 3, 4];

    // care este diferența dintre let și const în acest caz?
    ```


### 1.2 Proprietatea length
- Pentru a accesa dimensiunea curentă a unui array, putem folosi proprietatea length
    ```javascript
    const arr = [1, 2, 3, 4];

    // o să printeze 4
    console.log(arr);
    console.log(arr.length);

    // ce credeți că se va întâmpla dacă modificăm explicit dimensiunea unui array?
    arr.length = 10;
    console.log(arr);
    console.log(arr.length); 
    ```


### 1.3 Accesarea datelor
- Valorile din cadrul unui array pot fi accesate în mod direct prin utilizarea indecșilor
    ```javascript
    const arr = [1, "web", {day: "Tuesday"}];

    // accesare directă
    console.log(arr[0]);
    console.log(arr[1]);

    // accesarea se poate face prin utilizarea unei alte variabile
    const idx = 2;
    console.log(arr[idx]);

    // de asemenea, un array poate fi destructurat în elementele componente
    const [first, second, third] = arr;
    console.log(first);
    console.log(second);
    console.log(third);
    ```


### 1.4 Manipularea datelor
- Pentru a adăuga date, putem folosi metoda **push**
    ```javascript
    const arr = [1, 2, 3, 4];

    arr.push(5);
    console.log(arr);
    ```

- Pentru a extrage ultimul element dintr-un array, folosim metoda **pop** ce permite utilizarea unui array pe post de stivă
    ```javascript
    const arr = [1, 2, 3, 4];

    const lastElement = arr.pop();
    console.log(lastElement);
    console.log(arr);
    ```
    - dacă vrem să extragem primul obiect din array, putem folosi metoda "shift"

- Pentru ștergerea corectă a unui element, folosim varianta scurtă a metodei **splice**
    ```javascript
    const arr = [1, 2, 3, 4];

    // stergere unui element de la poziția 0
    const removedElement = arr.splice(0, 1);
    console.log(removedElement);
    console.log(arr);
    ```

    - splice poate fi folosit și pentru înlocuirea unor elemente într-un array, pe o anumită porțiune

    - JavaScript permite și utilizarea keyword-ului "delete" pentru a șterge valorile din cadrul unui array, însă, spre diferență de splice, acesta nu va șterge și poziția ocupată din array, lăsând un element gol
        ```javascript
        const arr = [1, "web", {day: "Tuesday"}];

        delete arr[2];

        console.log(arr);
        ```

- Pentru concatenarea a două array-uri putem folosi metoda **concat**
    ```javascript
    const arr = [1, "web", {day: "Tuesday"}];
    const arr2 = [2, 3, 4];

    // concatenarea nu se va face in-place
    //  ci va rezulta un array ce va contine ambele array-uri
    const combined = arr.concat(arr2);

    console.log(combined);
    ```

- Pentru extragerea unui subșir din cadrul unui array, se poate folosi metoda **slice** (a nu se confunda cu metoda *splice*)
    ```javascript
    const arr = [1, 2, 3, 4];

    console.log(arr.splice(0, 2));
    ```


### 1.5 Parcurgerea unui array
- Parcurgerea unui array se poate face prin mai multe modalități
    ```javascript
    const arr = [10, 11, 12, 13];

    // utilizarea unui for clasic
    for(let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }

    // utilizarea sintaxei for .. of
    for(let element of arr) {
        console.log(element);
    }

    // utilizarea sintaxei for .. in
    //      observăm că se realizează iterarea indecșilor
    //      în JavaScript, un index este, de fapt, o proprietate
    for(let element in arr) {
        console.log(arr[element]);
    }

    // utilizarea sintaxei forEach
    arr.forEach(element => console.log(element));
    ```

- Se poate observa că, spre diferență de metodele clasice de parcurgere a unui array, metoda forEach primește ca parametru o altă metodă, definită prin ca arrow function
    - Această metodă pasată ca parametru poartă numele de **callback**, fiind un concept foarte important pentru JavaScript
    - Cu ajutorul callback-urilor, putem implementa comportamente dinamice și folosi mecanisme ce permit programarea asincronă (după cum vom vedea în seminarele viitoare)


### 1.6 Operatorul rest și operatorul spread
- Array-urile beneficiază de existența a doi operatori foarte puternici care, în ciuda faptului că utilizează aceeași notație (...), au efecte complet opuse

- Operatorul rest permite trimiterea unui număr variabil de parametri într-o funcție, încapsulând mai multe variabile individuale într-un array
    ```javascript
    // operatorul rest poate fi folosit doar ca ultim parametru in definirea unei funcții
    function checkRestOp(...params) {
        params.forEach(param => console.log(param));
    }

    checkRestOp(1, 2, 3, 4, 5);
    ```

- Operatorul spread permite expandarea unui array în elementele componente
    ```javascript
    function functionWith3Params(x, y, z) {
        console.log(x);
        console.log(y);
        console.log(z);
    }

    const arr = [1, 2, 3];
    functionWith3Params(...arr);
    ```

### 1.7 Copierea unui array
- Toate mecanismele implicite de copiere a unui array creează **o copie shallow**, incluzând:
    - copierea folosind operatorul spread
    - folosirea metodei Array.from
    - folosirea metodei slice
    - folosirea metodei concat
        ```javascript
        const arr = [{name: "John"}, {name: "Mary"}];

        const arrSpreadCopy = [...arr];
        const arrFromCopy = Array.from(arr);
        const arrSliceCopy = arr.slice();
        const arrConcatCopy = arr.concat([]);

        arr[1].name = "Marianne";

        console.log(arrSpreadCopy);
        console.log(arrFromCopy);
        console.log(arrSliceCopy);
        console.log(arrConcatCopy);
        ```

- Pentru crearea unei copii deep, se pot folosi metodele **JSON.parse** și **JSON.stringify** ce va forța JavaScript să refacă obiectul într-o zonă de memorie nouă
    ```javascript
    const arr = [{name: "John"}, {name: "Mary"}];

    const arrDeepCopy = JSON.parse(JSON.stringify(arr));

    arr[1].name = "Marianne";

    console.log(arr);
    console.log(arrDeepCopy);
    ```

    - vom învăța mai multe despre JSON în seminarele următoare, dar, poți citi despre structura și semnificația acestui format aici: [Recomandare](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)



## 2. Metode utile
- Obiectele de tipul Array pot folosi metode standard oferite de limbaj ce simplifică utilizarea datelor stocate la nivelul acestora

- metoda **sort**
    ```javascript
    const arr = [5, 3, 1, 3, 5];

    // ordonare implicită, bazată pe ordinea naturală
    arr.sort();
    console.log(arr);

    // metoda sort permite pasarea unei metode callback 
    //  ce primește 2 parametri și returnează rezultatul comparației dintre aceștia
    //      - -1 atunci când parametrul 1 < parametrul 2
    //      -  0 atunci când parametrul 1 === parametrul 2
    //      -  1 atunci când parametrul 1 > parametrul 2

    // ordonearea descrescătoare
    arr.sort((param1, param2) => param2 - param1);
    console.log(arr);
    ```
    
- metoda **reverse**
    ```javascript
    const arr = [1, 2, 3, 4, 5];

    arr.reverse();

    console.log(arr);
    ```

- metoda **includes**
    ```javascript
    const arr = [1, 2, "john", 4, 5];

    // verifică dacă un element se află într-un array
    console.log(arr.includes(5));
    console.log(arr.includes(8));
    console.log(arr.includes("john"));
    ```

- metoda **indexOf**
    ```javascript
    const arr = [1, 2, "john", 4, 5];

    // returnează prima poziție unde elementul este găsit în array
    console.log(arr.indexOf("john"));

    // dacă elementul nu există în array, returnează -1
    console.log(arr.indexOf("mary"));
    ```

- metoda **findIndex**
    ```javascript
    const arr = [1, 2, "john", "john", 4, 5];

    // similar cu metoda indexOf
    //  poate primi ca parametru un callback, ce permite o mai mare flexibilitate și scenarii mai complexe
    console.log(arr.findIndex((elem) => elem === "john"));

    // dacă elementul nu există în array, returnează -1
    console.log(arr.findIndex((elem) => elem === "mary"));
    ```

- metoda **find**
    ```javascript
    const arr = [1, 2, {name: "john"}, "john", 4, 5];

    // similar cu metodele indexOf si findIndex, dar returnează valoarea, nu index-ul
    //  este folosit cu precădere în scenarii complexe, când este necesară valoarea
    console.log(arr.find((elem) => elem.name === "john"));

    // dacă elementul nu exită în array, returnează undefined
    console.log(arr.find((elem) => elem.name === "mary"));
    ```

- metoda **join**
    ```javascript
    const arr = ["john", "marry", "george", "lucas"];

    // permite concatenarea, într-un string, a tuturor valorilor unui array
    //  separarea se va face după un separator primit ca parametru
    console.log("All the names are: " + arr.join(", "));
    ```

- metoda **map**
    ```javascript
    const arr = [
        {name: "john", age: 18},
        {name: "jim", age: 16},
        {name: "little george", age: 8},
        {name: "matthew", age: 21}
    ];

    // metoda map accesează fiecare element din array și returnează un alt element, posibil prelucrat
    //  este o metodă foarte utilizată pentru parcurgerea cu prelucrare a datelor
    const mappedArray = arr.map(element => { return {...element, allowed: element.age >= 18} });
    console.log(mappedArray);
    ```

- metoda **filter**
    ```javascript
    const arr = [
        {name: "john", age: 18},
        {name: "jim", age: 16},
        {name: "little george", age: 8},
        {name: "matthew", age: 21}
    ];

    // metoda filter accesează fiecare element din array, verifică o condiție 
    //      și returnează doar acele elemente care îndeplinesc condiția
    const filteredArray = arr.filter(element => element.age >= 18);
    console.log(filteredArray);
    ```

- metoda **reduce**
    ```javascript
    const arr = [
        {name: "john", age: 18},
        {name: "jim", age: 16},
        {name: "little george", age: 8},
        {name: "matthew", age: 21}
    ];

    // metoda reduce accesează fiecare element dintr-un array și execută o operație cumulativă asupra acestuia
    //  rezultatul callback-ului executat va fi stocat, la fiecare pas, în variabila accumulator
    //   ce își va păstra valoarea pe măsură ce fiecare pas este executat
    // pe lângă callback, metoda reduce mai primește un parametru ce reprezintă valoarea inițială a acumulatorului
    const totalAge = arr.reduce((accumulator, element) => accumulator + element.age, 0);
    console.log(totalAge);

    // în exemplul de mai sus, pașii executați vor fi:
    //  accumulator = 0, 0 + 18
    //  accumulator = 18, 18 + 16
    //  accumulator = 34, 34 + 8
    //  accumulator = 42, 42 + 21
    //  accumulator = 63 - valoare finala

    // putem spune ca "reduce" un array la un singur rezultat
    ```

- metoda **flat**
    ```javascript
    const arr = [1, 2, [1, 2, 3], [[1], [2]], 10, ["johnny", ["web", "tech"]]];

    // metoda flat "aplatizează" array-urile existente în interiorul array-ului principal
    console.log(arr.flat());

    // se observă că metoda flat() aplică transformarea doar primului nivel de array-uri
    //   pentru aplatizarea mai multor nivele, se poate apela succesiv
    console.log(arr.flat().flat());
    ```

- metoda **some**
    ```javascript
    const arr = [
        {name: "john", age: 18},
        {name: "jim", age: 16},
        {name: "little george", age: 8},
        {name: "matthew", age: 21}
    ];

    // metoda some verifică dacă cel puțin un element al unui array îndeplinește o condiție
    console.log(arr.some(element => element.age > 20));
    console.log(arr.some(element => element.name === "johnny"));
    ```

- metoda **every**
    ```javascript
    const arr = [
        {name: "john", age: 18},
        {name: "jim", age: 16},
        {name: "little george", age: 8},
        {name: "matthew", age: 21}
    ];

    // metoda some verifică dacă toate elementele unui array îndeplinesc o condiție
    console.log(arr.every(element => element.age > 18));
    console.log(arr.every(element => element.age > 7));
    ```


## 3. Exerciții
- [exercițiu 1](./practice/practice1.js)
- [exercițiu 2](./practice/practice2.js)
- [exercițiu 3](./practice/practice3.js)
- [exercițiu 4](./practice/practice4.js)
- [exercițiu 5](./practice/practice5.js)
- [exercițiu 6](./practice/practice6.js)
- [exercițiu 7](./practice/practice7.js)


## 4. Exemple (mai) complexe
- [înlănțuirea metodelor (method chaining)](./examples/method_chaining.js)
- [filtrarea cuvintelor](./examples/words_filter.js)
- [implementarea metodei map](./examples/map.js)
- [formatarea unui string folosind indexOf](./examples/format_1.js)
- [formatarea unui string folosind split și map](./examples/format_2.js)
- [verificare acrostic](./examples/acrostic.js)
- [filtrare dinamică](./examples/dynamic_filter.js)