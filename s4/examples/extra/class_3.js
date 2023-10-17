class Robot {
    constructor(name) {
        this.name = name;
    }

    move() {
        console.log(`${this.name} is moving`);
    }
}

const r0 = new Robot('Pepper');
r0.move();

class Weapon {
    constructor(description) {
        this.description = description;
    }

    fire() {
        console.log(`${this.description} is firing`);
    }
}

const w0 = new Weapon("pew pew laser");
w0.fire();

class CombatRobot extends Robot {
    constructor(name) {
        super(name);
        this.weapons = [];
    }

    addWeapon(weapon) {
        this.weapons.push(weapon);
    }

    fire() {
        console.log("firing all weapons");
        this.weapons.forEach(weapon => weapon.fire());
    }
}

const r1 = new CombatRobot("Optimus Prime");
r1.move();
r1.addWeapon(w0);
r1.fire();

Robot.prototype.fly = function () {
    console.log(`${this.name} is flying`);
}

r0.fly();
r1.fly();