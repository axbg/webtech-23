const giveRaises = (currentSalaries, raise) => {
    /* funcția primește un array de salarii și acordă măriri procentuale fiecăruia
    trebuie să arunce o excepție dacă 
        - primul parametru nu este un array
        - al doilea parametru nu este un număr mai mare decât zero
        - dacă oricare dintre salariile primite ca parametru este mai mic sau egal cu zero
    să se logheze salariile după ce măririle sunt aplicate
    */
}

try {
    giveRaises([500, 1000, 750], 10) // should pass
    giveRaises(75, 10) // should throw error
    giveRaises([500, 1000, 'coffee'], 10) // should throw error
    giveRaises([500, 1000, 750], 'a small loan of a million dollars') // should throw error
} catch (error) {
    console.warn(error)
}