class MusicalInstrument {
    constructor(name, country) {
        this.name = name;
        this.country = country;
    }

    get getName() {
        return this.name;
    }

    get getCountry() {
        return this.country;
    }

    set setName(value) {
        this.name = value;
    }

    set setCountry(value) {
        this.country = value;
    }

    playNote(note) {
        console.log(`${this.name} is now playing the note ${note}`);
    }

    getInstrumentDescription() {
        console.log(`${this.name} is a musical instrument available in ${this.country}`);
    }
};

class Guitar extends MusicalInstrument {
    constructor(name, country, stringsNo) {
        super(name, country);
        this.stringsNo = stringsNo;
    }

    getInstrumentDescription() {
        console.log(`${this.name} is a guitar available in ${this.country} and it has ${this.stringsNo} strings`);
    }
}

const myGuitar = new Guitar("Ibanez", "Romania", 6);
myGuitar.getInstrumentDescription();
myGuitar.playNote("E");
myGuitar.setName = "Ibanez Pro";
console.log(myGuitar.getName);