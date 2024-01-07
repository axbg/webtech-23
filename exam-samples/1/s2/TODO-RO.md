# Subiectul 2 (2.5 pts)
# Tematica: Javascript

# Avand urmatoarea functie `function addTokens(input, tokens)` unde:
- `input` este un string ce poate sa contina "...". De exemplu: Subsemnatul ..., dominiciliat in ...;
- `tokens` un vector de tokenuri.
- Functia trebuie sa inlocuiasca toate `...` din `input` cu valorile corespunzatoare din `tokens` sub urmatorul format `${tokenName}`, in ordinea in care exista in vector;

# Complete the following tasks:

- `input` trebuie sa fie de tip `string`. Daca alt tip este pasat ca si parametru aruncati `Error` cu mesajul `Input should be a string`; (0.5 pts)
- `input` trebuie sa aiba cel putin 6 caractere ca si lungime. Daca dimensiunea `input-ului` este mai mica de 6, aruncati `Error` cu mesajul `Input should have at least 6 characters`; (0.5 pts)
- `tokens` este un vector de elemente cu urmatorul format: `{tokenName: string}`. Daca urmatorul format nu este respectat, aruncati `Error` cu urmatorul mesaj `Invalid array format`; (0.5 pts)
- Daca `input` nu contine `...` returnati valoarea initiala a `input-ului`; (0.5 pts)
- Daca `input` contine `...`, inlocuiti-le cu valorile specifice si returnati noul `input`; (0.5 pts)