const getDinosaurs = (callback) => {
  setTimeout(() => {
    const dinosaurs = ["Apatosaurus", "Tyrannosaurus", "Giganotosaurus", "Allosaurus"];
    callback(dinosaurs);
  }, 2000);
};

const getDinosaursAge = (dinosaurs, callback) => {
  setTimeout(() => {
    const dinosaursWithAge = dinosaurs.map((dinosaur) => ({
      name: dinosaur,
      age: Math.trunc(Math.random() * 20) + 1,
    }));
    callback(dinosaursWithAge);
  }, 2000);
};

const getDinosaursColor = (dinosaursWithAge, callback) => {
  setTimeout(() => {
    const dinosaursWithColor = dinosaursWithAge.map((dinosaur) => ({
      ...dinosaur,
      color: dinosaur.age % 2 ? "brown" : "blue",
    }));
    callback(dinosaursWithColor);
  }, 2000);
};

const displayDinosaurs = (dinosaursWithColor) => {
  console.log(`Dinosaurs with age and color: `);
  for (dinosaur of dinosaursWithColor) {
    console.log(dinosaur);
  }
};

getDinosaurs((dinosaurs) => {
  getDinosaursAge(dinosaurs, (dinosaursWithAge) => {
    getDinosaursColor(dinosaursWithAge, (dinosaursWithColor) => {
      displayDinosaurs(dinosaursWithColor);
    })
  })
})
