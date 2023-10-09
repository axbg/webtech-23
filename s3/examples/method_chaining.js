const getTotalArea = (squaredDimensions) => {
    return squaredDimensions
        .map(side => side * side)
        .reduce((acc, current) => acc + current, 0);
}

const squaredDimensions = [3, 5, 12, 3, 5, 3];

console.log("result: " + getTotalArea(squaredDimensions));