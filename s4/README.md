# Closures, clase și excepții

## Conținut
1. [Closures](#1-closures)
    1. [Scopes](#11-scopes)
    2. [Contextul unui closure](#12-contextul-unui-closure)

2. [Clase](#2-clase)
    1. [Declararea unei clase](#21-declararea-unei-clase)
    2. [Constructorul](#22-constructorul)
    3. [Metode](#23-metode)
    4. [Proprietăți](#24-proprietăți)
    5. [Funcțiile constructor și prototipurile](#25-funcțiile-constructor-și-prototipurile)

3. [Erori](#3-erori-excepții)

4. [Exemple](#4-exemple)

5. [Exerciții](#5-exerciții)


## 1. Closures
- Un closure este o funcție care "își amintește" variabilele din contextul în care a fost creată, chiar și atunci când contextul nu mai este direct accesibil

- Pentru a înțelege mai bine conceptul de closure, trebuie să ne reamintim de un concept discutat anterior, acela de **scope** (pe care îl putem traduce aproximativ ca domeniu)

    ![Scopes and closures](https://opensource.com/sites/default/files/uploads/execution-context.png)

### 1.1 Scopes
- În JavaScript, există 2 tipuri mari de scopes:
    - Global scope
        - cuprinde tot domeniul unui program
        - variabilele declarate aici poartă numele de variabile globale
        - variabilele declarate aici pot fi accesate și modificate din orice zonă a programului, pe tot parcursul execuției acestuia

    - Local scope
        - variabilele declarate aici poartă numele de variabile locale
        - variabilele declarate aici au o durată de viață limitată, fiind dezalocate în momentul în care scope-ul declarării este distrus
        - se ramifică în alte două subtipuri:
            - Function scope
                - definit în momentul executării unei funcții
                - poate accesa variabilele globale și pe cele declarate la nivel de funcție
            
            - Block scope
                - definit în momentul executării unui bloc de instrucțiuni (if, while, for, etc)
                - poate accesa variabilele globale, variabilele declarate la nivelul funcției în care blocul este definit și variabilele declarate la nivelul blocului

- O analogie extrasă din [acest articol](https://blog.codeanalogies.com/2017/11/22/how-javascript-variable-scoping-is-just-like-multiple-levels-of-government/) compară cele 3 tipuri distince de scopes cu legile care, adesea, sunt definite la mai multe niveluri
    ```javascript
    const humanRights1 = "All human beings are free and equal";
    const humanRights2 = "No discrimination";

    // drepturile omului sunt aplicabile și în Europa
    function europe(country) {
        const europeanLaw = "General Data Protection Regulation (GDPR)";

        // drepturile omului și legile europene sunt aplicabile și în România, împreună cu celelalte legi și reglementări locale
        if (country === "Romania") {
            const publicHoliday1 = "1 Decembrie";
        }
    }
    ```

### 1.2 Contextul unui closure
- Similar cu modul în care variabilele sunt accesibile în raport cu scope-ul în care au fost definite, un closure va putea accesa:
    - variabilele definite la nivelul propriei funcții
    - variabilele din funcția părinte
    - variabilele globale
    ```javascript
    const a = 1;
    
    function outerFunction(x) {
        return function middleFunction(y) {
            return function innerFunction(z) {
                // poate accesa a global 
                // x din outerFunction
                // y din middleFunction
                // z din propria definiție
                console.log(a + x + y + z); 
            }
        }
    }

    const x = outerFunction(1);
    const xx = x(1);

    // va afișa 4
    xx(1);
    ```

- Un closure va stoca valorile variabilelor din momentul în care este apelat, fiind un mecanism foarte puternic de încapsulare a datelor
    ```javascript
    function init() {
        let name = "Mozilla"; 

        function displayName() {
            // funcția care formează closure-ul
            console.log(name); // variabilă inițializată în context
        }
        
        displayName();
    }

    init();
    ```

- Recomandare: [un articol ce conține o analogie pentru o mai bună înțelegere a conceptului de closure](https://blog.codeanalogies.com/2018/10/19/javascript-closures-explained-by-mailing-a-package/)
- Recomandare: [closures în 100 de secunde](https://www.youtube.com/watch?v=vKJpN5FAeF4)


## 2. Clase
- În JavaScript, la fel ca în oricare alt limbaj de programare orientat obiect, o clasă reprezintă un șablon ce încapsulează proprietăți și comportamente ce este utilizat pentru instanțierea mai multor obiecte similare

- Spre diferență de limbajele OOP clasice, JavaScript are la bază prototipul, motiv pentru care clasele, o adiție relativ recentă, folosesc, în implementare, prototipuri, fiind o formă de syntactic sugar

### 2.1 Declararea unei clase
- Declararea unei clase poate avea mai multe forme, toate având, însă, aceeași formă de utilizare
    ```javascript
    // declararea normală a unei clase
    class Animal {
        constructor(name, species) {
            this.name = name;
            this.species = species;
        }
    }

    // class expression - clasa este anonimă dar atribuită unei variabile
    const DomesticAnimal = class {
        constructor(species) {
            this.species = species;
        }
    }

    // class expression - clasa are propriul său nume
    const MyAnimalClass = class Animal {
        constructor(name, species) {
            this.name = name;
            this.species = species;
        }
    }

    // instanțierea obiectelor aferente
    const firstAnimal = new Animal("Bobby", "dog");
    const secondAnimal = new NamelessAniaml("fish");
    const thirdAnimal = new MyAnimalClass("Zoro", "cat");
    ```

### 2.2 Constructorul
- Constructorul este o metodă specială a unei clase ce este folosită pentru crearea și inițializarea unui obiect

- Fiecare clasă poate avea un singur constructor, definit printr-o metodă cu același nume
    - În cazul în care sunt definiți mai mulți constructori, va fi aruncată o excepție 

- Keyword-ul **super** permite apelarea constructorului din clasa părinte în momentul în care definim o relație de moștenire, prin termenul **extends**
    ```javascript
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }

    class Student extends Person {
        constructor(name, age, major) {
            super(name, age);
            this.major = major;
        }
    }
    ```

### 2.3 Metode
- Metodele definesc comportamente și acțiuni specifice unei clase
    ```javascript
    class Person {
        constructor(name) {
            this.name = name;
        }

        // getter
        get name() {
            return this.name;
        }

        // setter
        set name(newName) {
            this.name = newName;
        }

        greet() {
            console.log("Hello, " + this.name + "!");
        }
    }

    const firstPerson = new Person("Mary");
    firstPerson.greet(); // Hello, Mary!
    // utilizare setter
    firstPerson.name = "John";
    // utilizare getter
    firstPerson.log(firstPerson.name);
    ```

- În JavaScript, o metodă definită într-o clasă va fi implementată printr-o funcție atașată prototipului părinte

- Din punct de vedere al modelării și implementării claselor există multe similarități cu limbajele studiate anterior (Java, C#), putând observa în exemplul anterior implementarea unor metode de tipul getter/setter pentru accesarea, respectiv modificarea, unei proprietăți 

- Pe lângă metodele asociate unei instanțe, putem defini metode statice prin utilizarea keyowrd-ului *static*, ce vor putea fi apelate la nivel de clasă, nu la nivel de obiect
    ```javascript
    class Person {
        static yawn() {
            console.log("Yaaaaaaaaawn");
        }
    }

    Person.yawn();
    ```


### 2.4 Proprietăți
- Proprietățile unei clase pot fi definite la nivelul blocului principal al clasei sau direct în constructor și pot fi publice sau private (precedate de #)
    ```javascript
    class Person {
        name;
        // private, can't be accessed directly, 
        // but through a getter and updated using a setter
        #location;

        constructor(name, age, location) {
            this.name = name;
            this.age = age;
            this.#location = location;
        }

        greet() {
            console.log(`Hello, I'm ${this.name} and I'm ${this.age} years old!`);
        }
    }
    ```

- La fel cum este în cazul metodelor, o clasă poate declara una sau mai multe proprietăți statice, asociate clasei și nu instanțelor
    ```javascript
    class MathUtils {
        // atribut static
        static PI = 3.14159265359;

        // metodă statică
        static calculateCircleArea(radius) {
            return MathUtils.PI * radius ** 2;
        }
    }

    console.log(`Valoarea lui PI este: ${MathUtils.PI}`);

    const radius = 5;
    const area = MathUtils.calculateCircleArea(radius);
    console.log(`Aria unui cerc cu diametrul ${radius} este: ${area}`);
    ```

### 2.5 Funcțiile constructor și prototipurile
- Înainte de introducerea claselor în limbaj, comportamentul OOP putea fi simulat folosind funcții constructor, ce permit declararea unui tip de obiect ce poate fi modificat ulterior (atât din punct de vedere al proprietăților, cât și al metodelor)
    ```javascript
        // funcție constructor
        function Plant(species, region) {
            this.species = species;
            this.region = region;
        }

        // adăugarea metodelor folosind prototipul
        Plant.prototype.getDescription = function() {
            console.log(`This plant belongs to the species ${this.species} 
            and can be found in the region of ${this.region}`);
        }

        const cactus = new Plant("Cactaceae", "Americas");

        // cum ar arăta o clasă echivalentă din punct de vedere al funcționalității?
    ```

- Funcțiile constructor și clasele produc același rezultat din punct de vedere structural, ambele obiecte obținute fiind derivate din clasa de bază Object


## 3. Erori (excepții)
- Erorile, similare excepțiilor din limbaje precum Java și C#, reprezintă un obiect asociat unor evenimente excepționale ce pot apărea pe durata execuției unui program

- O listă completă a erorilor predefinite din JavaScript poate fi regăsită [aici](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors)

- Erorile pot fi generate automat, de către interpretor la executarea unei instrucțiuni eronate, sau programatic, prin utilizarea keyword-ului **throw**
    ```javascript
    function throwIfZero(n) {
        if (n === 0) {
            throw new TypeError("The number should not be 0");
        }

        return console.log(n * n);
    }
    ```

- În completarea tipurilor de erori predefinite pot fi create erori custom, prin extinderea clasei de bază *Error*, ce pot fi utilizate pentru stabilirea unor restricții la nivel de aplicație
    ```javascript
    class MyCustomError extends Error {
        constructor(message) {
            super(message); .
            this.name = 'MyCustomError'; 
        }
    }

    function divide(a, b) {
        if (b === 0) {
            throw new MyCustomError("Division by zero is not allowed.");
        }
        return a / b;
    }
    ```

- Un mecanism la fel de important este mecanismul de gestionare a excepțiilor, cunoscut sub numele de mecanismul *try/catch/finally*
    ```javascript
        const greet = (name) => {
            if (typeof name === "string") {
                console.log(`Hello, ${name}`);
            } else {
                throw new TypeError("The name should be a string");
            }
        }

        try {
            // instrucțiuni ce pot declanșa apariția unei erori
            greet();
        } catch (e) {
            // instrucțiuni apelate în cazul interceptării unei erori    
            console.log(e);
        } finally {
            // instrucțiuni apelate indiferent de rezultatul funcției
        }
    ```

- Pentru gestionarea în mod diferit a mai multor tipuri de erori, blocul catch fi definit sub forma
    ```javascript
    catch(error) {
        if (e instanceof RangeError) {
            // execută un tip specific de instrucțiuni pentru erorile de tipul RangeError
        } else if (e instanceof TypeError) {
            // execută un tip specific de instrucțiuni pentru erorile de tipul TypeError
        } else {
            // altfel aruncă excepția mai departe
            throw e; 
        }
    }
    ```

## 4. Exemple
- 1. [Closures](./examples/closure.js)
- 2. [Class](./examples/class.js)
- 3. [Class constructor function](./examples/class_constructor_function.js)
- 4. [Error](./examples/error.js)
    - 1. [Extra class](./examples/extra/class_2.js)
    - 2. [Extra class 2](./examples/extra/class_3.js)
    - 3. [Error 2](./examples/extra/error_2.js)

## 5. Exerciții
- 1. [Closures](./practice/closure.js)
- 2. [Class](./practice/class.js)
- 3. [Error](./practice/error.js)
