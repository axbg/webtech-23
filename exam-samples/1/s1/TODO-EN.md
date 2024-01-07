# TOPIC: Javascript

# Given that 
 - the `distance` function receives as parameters two strings and implements the Levenshtein distance
 - the distance between the 2 strings is the number of elements that must be changed in the first string to obtain the second string
 - changes can be additions, removals or substitutions of letters
 - if the parameters are not string primitives or String objects an exception is thrown (`InvalidType`)

# Complete the following tasks
 - `distance` correctly returns the result for 2 strings with only additions(20%)
 - `distance` correctly returns the result for 2 strings with only removals (20%)
 - `distance` correctly throws `InvalidType` if one of the parameters is not a String or a string primitive (20%)
 - `distance` correctly returns 0 when comparing empty strings (20%)
 - `distance` correctly returns the result (20%)