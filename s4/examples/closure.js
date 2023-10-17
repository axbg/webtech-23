function square() {
    const cache = {};
    const calculateSquare = (number) => {
        if (cache[number]) {
            console.log('(read from cache)');
            return cache[number];
        } else {
            cache[number] = Math.pow(number, 2);
            return Math.pow(number, 2);
        }
    }
    return calculateSquare;
}

const MathSquare = square();
console.log(MathSquare(2));
console.log(MathSquare(2));
console.log(MathSquare(5));