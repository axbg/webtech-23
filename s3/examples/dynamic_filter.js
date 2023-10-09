const laptops = [
    {
        brand: "HP",
        processor: "i5",
        ram: 8
    },
    {
        brand: "Lenovo",
        processor: "i5",
        ram: 16
    },
    {
        brand: "Acer",
        processor: "i5",
        ram: 8
    },
    {
        brand: "Asus",
        processor: "i7",
        ram: 8
    },
    {
        brand: "Apple",
        processor: "M1",
        ram: 16
    }
];

const filterByProperties = (laptops, filterProperties) => {
    return laptops
        .filter(laptop => {
            return Object.keys(filterProperties)
                .map(key => !laptop[key] || laptop[key] !== filterProperties[key])
                .some(elem => elem === true)
        })
        .map(laptop => laptop);
};

console.log(filterByProperties(laptops, { processor: "i5", ram: 8 }));