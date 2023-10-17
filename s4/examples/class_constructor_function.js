function MusicalInstrument(name, country) {
    this.name = name;
    this.country = country;
};

MusicalInstrument.prototype.getInstrumentDescription = function () {
    console.log(`${this.name} is a musical instrument available in ${this.country}`);
};

MusicalInstrument.prototype.playNote = function (note) {
    console.log(`${this.name} is now playing the note ${note}`);
};

function Guitar(name, country, noStrings) {
    MusicalInstrument.call(this, name, country); // this is our "super()"
    this.noStrings = noStrings;
}

Guitar.prototype = new MusicalInstrument();

Guitar.prototype.getInstrumentDescription = function () {
    console.log(`${this.name} is a guitar available in ${this.country} and it has ${this.stringsNo} strings`);
}

const myGuitar = new Guitar("Ibanez", "Romania", 6);
myGuitar.playNote("E");
myGuitar.getInstrumentDescription();