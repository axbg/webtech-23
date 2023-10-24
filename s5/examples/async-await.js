const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getDinosaurs = async () => {
  await delay(2000);
  const dinosaurs = ["Apatosaurus", "Tyrannosaurus", "Giganotosaurus", "Allosaurus"];
  return dinosaurs;
};

const getDinosaursAge = async (dinosaurs) => {
  await delay(2000);
  const dinosaursWithAge = dinosaurs.map((dinosaur) => ({
    name: dinosaur,
    age: Math.trunc(Math.random() * 20) + 1,
  }));
  return dinosaursWithAge;
};

const getDinosaursColor = async (dinosaursWithAge) => {
  await delay(2000);
  const dinosaursWithColor = dinosaursWithAge.map((dinosaur) => ({
    ...dinosaur,
    color: dinosaur.age % 2 ? "brown" : "blue",
  }));
  return dinosaursWithColor;
};

const displayDinosaurs = (dinosaursWithColor) => {
  console.log(`Dinosaurs with age and color: `);
  dinosaursWithColor.forEach((dinosaur) => {
    console.log(dinosaur);
  });
};

async function main() {
  try {
    const dinosaurs = await getDinosaurs();
    const dinosaursWithAge = await getDinosaursAge(dinosaurs);
    const dinosaursWithColor = await getDinosaursColor(dinosaursWithAge);
    displayDinosaurs(dinosaursWithColor);
  } catch (error) {
    console.error(error);
  }
}

main();