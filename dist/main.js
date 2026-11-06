"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("./repository");
const decorators_1 = require("./decorators");
const wizards = new repository_1.WizardRepository();
const spells = new repository_1.SpellRepository();
console.log("=== Exercice 1 ===");
const harry = wizards.addWizard({
    name: "Harry Potter",
    house: "Gryffindor",
    level: 5,
    active: true,
});
wizards.addWizard({ name: "Draco Malfoy", house: "Slytherin", level: 5, active: true });
wizards.addWizard({ name: "Hermione Granger", house: "Gryffindor", level: 6, active: true });
console.log("Sorcier ajouté :", harry);
console.log("\n=== Exercice 2 ===");
console.log("Gryffindor :", wizards.findByHouse("Gryffindor").map((w) => w.name));
console.log("\n=== Exercice 3 ===");
function handleSpellCast(event) {
    console.log(`Wizard ${event.wizardId} cast ${event.spellName}`);
}
handleSpellCast({
    type: "spell-cast",
    wizardId: 1,
    spellName: "Expelliarmus",
});
console.log("\n=== Exercice 4 ===");
spells.add({ id: 102, name: "Protego", category: "defense", power: 50 });
console.log("Sort valide ajouté :", spells.getAll().length, "sort(s)");
try {
    spells.add({ id: 103, name: "Invalid Spell", category: "attack", power: -10 });
}
catch (error) {
    console.log("Sort refusé :", error.message);
}
console.log("Nombre de sorts après le test :", spells.getAll().length);
console.log("\n=== Exercice 5 ===");
class SpellCalculator {
    calculatePower(basePower, multiplier) {
        console.log("Calculating...");
        return basePower * multiplier;
    }
}
__decorate([
    decorators_1.Cache
], SpellCalculator.prototype, "calculatePower", null);
const calculator = new SpellCalculator();
console.log(calculator.calculatePower(10, 3));
console.log(calculator.calculatePower(10, 3));
console.log(calculator.calculatePower(5, 2));
console.log("\n=== Exercice 6 ===");
const validHouses = [
    "Gryffindor",
    "Slytherin",
    "Ravenclaw",
    "Hufflepuff",
];
function isHouse(value) {
    return (typeof value === "string" &&
        validHouses.some((house) => house === value));
}
function isWizard(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const candidate = value;
    return (typeof candidate.id === "number" &&
        typeof candidate.name === "string" &&
        isHouse(candidate.house) &&
        typeof candidate.level === "number" &&
        typeof candidate.active === "boolean");
}
const validData = {
    id: 1,
    name: "Harry Potter",
    house: "Gryffindor",
    level: 5,
    active: true,
};
const invalidData = {
    id: 2,
    name: "Viktor",
    house: "Durmstrang",
    level: 5,
    active: true,
};
console.log(isWizard(validData));
console.log(isWizard(invalidData));
