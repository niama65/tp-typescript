import type { House, SpellCastEvent, Wizard } from "./types";
import { SpellRepository, WizardRepository } from "./repository";
import { Cache } from "./decorators";

const wizards = new WizardRepository();
const spells = new SpellRepository();
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
console.log(
  "Gryffindor :",
  wizards.findByHouse("Gryffindor").map((w) => w.name)
);

console.log("\n=== Exercice 3 ===");
function handleSpellCast(event: SpellCastEvent): void {
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
} catch (error) {
  console.log("Sort refusé :", (error as Error).message);
}
console.log("Nombre de sorts après le test :", spells.getAll().length);

console.log("\n=== Exercice 5 ===");
class SpellCalculator {
  @Cache
  calculatePower(basePower: number, multiplier: number): number {
    console.log("Calculating...");
    return basePower * multiplier;
  }
}

const calculator = new SpellCalculator();
console.log(calculator.calculatePower(10, 3)); 
console.log(calculator.calculatePower(10, 3)); 
console.log(calculator.calculatePower(5, 2)); 

console.log("\n=== Exercice 6 ===");
const validHouses: readonly House[] = [
  "Gryffindor",
  "Slytherin",
  "Ravenclaw",
  "Hufflepuff",
];

function isHouse(value: unknown): value is House {
  return (
    typeof value === "string" &&
    validHouses.some((house) => house === value)
  );
}

function isWizard(value: unknown): value is Wizard {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    isHouse(candidate.house) &&
    typeof candidate.level === "number" &&
    typeof candidate.active === "boolean"
  );
}

const validData: unknown = {
  id: 1,
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true,
};

const invalidData: unknown = {
  id: 2,
  name: "Viktor",
  house: "Durmstrang",
  level: 5,
  active: true,
};

console.log(isWizard(validData)); 
console.log(isWizard(invalidData)); 
