const orderLemonade = (lemonadeType) => {
    const existingLemonadeTypes = ['SIMPLE', 'LAVANDER', 'MANGO'];
    if (existingLemonadeTypes.find(type => type === lemonadeType)) {
        console.log(`Preparing lemonade ${lemonadeType}.`);
    } else {
        throw new Error('Sorry, we don\'t have that lemonade in the menu :(.');
    }
}

try {
    orderLemonade('SIMPLE');
    orderLemonade('MANGO');
    orderLemonade('RASPBERRY');
} catch (error) {
    console.warn(error);
}

console.log('Finished ordering.');