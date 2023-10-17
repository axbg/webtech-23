const orderCoffee = (type) => {
    const types = {
        REGULAR: "REGULAR",
        SPECIAL: "SPECIAL"
    };

    if (Object.values(types).indexOf(type) === -1) {
        throw new Error("Coffee type does not exist");
    } else {
        console.log(`Preparing the ${type} coffee`)
    }
}

try {
    orderCoffee("REGULAR");
    orderCoffee("AMERICANO");
} catch (e) {
    console.warn(e);
}