const words = [
    "fox",
    "wolf",
    "snake",
    "crocodile",
    "lion",
    "cat",
    "crocodile",
    "horse"
];
const forbiddenWords = ["crocodile", "horse"]
const minimumLength = 4;

const filteredWords = (words, forbiddenWords, minimumLength) => {
    return words.filter(word => !forbiddenWords.includes(word) && word.length >= minimumLength);
};

console.log(filteredWords(words, forbiddenWords, minimumLength));