# TOPIC: Javascript

# Dat fiind că : 
 - funcția `distance` primește ca parametrii două primitive string sau obiecte String și implementează o distanță Levenshtein
 - distanța dintre cele 2 string-uri este numărul de elemente care trebuie schimbate în primul string pentru a-l obține pe al doilea; schimbarile pot consta în ștergeri, adăugări sau înlocuiri de litere
 - dacă parametrii nu sunt primitive string sau obiecte String se va arunca o excepție (`InvalidType`)

# Completați următoarele cerințe
 - `distance` returnează rezultatul corect la pentru 2 stringuri (doar adăugări) (20%)
 - `distance` returnează rezultatul corect la pentru 2 stringuri (doar ștergeri) (20%)
 - `distance` aruncă `InvalidType` dacă unul dintre parametri nu este de tip string sau String (20%)
 - `distance` returnează 0 la compararea a 2 stringuri vide (20%)
 - `distance` returnează rezultatul corect la pentru 2 stringuri (20%)
