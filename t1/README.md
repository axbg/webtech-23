# Tema 1

## Javascript

### Obiectiv: să se modifice în locul marcat fișierul [app.js](./src/app.js) astfel încât să treacă [testele](./src/test/)

### 1. Știind că:
 - funcția `rle` comprimă/decomprimă o primitivă string sau un obiect String și implementează compresie RLE (Run-length encoding)
 - compresia RLE presupune transformarea unui (în acest caz) string într-un alt string
 - caracterele consecutive sunt înlocuite cu un singur caracter urmat de numărul de apariții (exemplu: `aaaavvvssss` va deveni `a4v3s4`)
 - parametrii funcției sunt string-ul și un parametru cu valoare default; dacă acesta este true, se face compresie, altfel decompresie
 - dacă parametrii nu sunt primitive string sau obiecte String, respectiv boolean se va arunca o excepție (`InvalidType`)

### 2. Completați următoarele cerințe:
 - `rle` returnează rezultatul corect pentru un string vid (20%)
 - `rle` returnează rezultatul corect pentru compresia unui string (20%)
 - `rle` aruncă `InvalidType` parametrul nu este de tip string sau String (20%)
 - `rle` returnează rezultatul corect pentru decompresia unui string (20%)
 - `rle` utilizează corect parametrul default (20%)
 - modificarea testelor nu este permisă!

### 3. Pași pentru a rula testele și a trimite tema:
1. Creează un repository nou, **privat** pe GitHub cu numele *webtech-tema-1*
2. Adaugă directorul curent (t1) în noul repository
3. În directorul `src` rulează comanda `npm install` pentru a instala modulele necesare executării testelor
4. Adaugă implementarea necesară rezolvării cerințelor în fișierul app.js din directorul src
5. În directorul `src` rulează comanda `npm test` pentru a rula testele
6. Verifică rezultatul testelor
    - Teste picate
        ![Rulare teste](./assets/teste-bad.png)

    - Teste valide
        ![Rulare teste](./assets/teste-good.png)
7. După rezolvarea cerințelor creează un commit și folosește comanda push pentru a încărca modificările pe GitHub (detalii în [primul seminar](./../s1/README.md))
8. Acordă acces profesorului de la seminar pentru verificarea repository-ului
    - [Tutorial acordare acces](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository)
    - User profesor: [axbg](https://github.com/axbg)
9. Copiază link-ul repository-ului și completează [acest formular](https://forms.gle/pBfSGMtwtr4itT4c8)