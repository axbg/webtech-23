const fetchDinosaurs = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const dinosaurs = [
                "Apatosaurus",
                "Tyrannosaurus",
                "Giganotosaurus",
                "Allosaurus",
            ];
            resolve(dinosaurs);
        }, 2000);
    });
};

const fetchDinosaursAge = (dinosaurs) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const dinosaursWithAge = dinosaurs.map((dinosaur) => ({
                name: dinosaur,
                age: Math.trunc(Math.random() * 20) + 1,
            }));
            resolve(dinosaursWithAge);
        }, 2000);
    });
};

const fetchDinosaursColor = (dinosaursWithAge) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const dinosaursWithColor = dinosaursWithAge.map((dinosaur) => ({
                ...dinosaur,
                color: dinosaur.age % 2 ? "brown" : "blue",
            }));
            resolve(dinosaursWithColor);
        }, 2000);
    });
};

const displayDinosaurs = (dinosaursWithColor) => {
    console.log(`Dinosaurs: ${dinosaursWithColor.map((dino) => dino.name)}`);
    console.log(`Dinosaurs with age and color: `);
    for (dinosaur of dinosaursWithColor) {
        console.log(dinosaur);
    }
}

fetchDinosaurs()
    .then((dinosaurs) => fetchDinosaursAge(dinosaurs))
    .then((dinosaursWithAge) => fetchDinosaursColor(dinosaursWithAge))
    .then((dinosaursWithColor) => {
        displayDinosaurs(dinosaursWithColor);
    })
    .catch((error) => {
        console.error(error);
    });
