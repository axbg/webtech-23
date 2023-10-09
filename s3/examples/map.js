const arr = [1, 2, 3, 4, 5];

const map = (arr, transformation) => {
    const result = [];

    for (let elem of arr) {
        result.push(transformation(elem));
    }

    return result;
};

console.log(map(arr, (x) => x * 2));