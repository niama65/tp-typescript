import type { NewWizard, Spell, Wizard } from "./types";
import { ValidateSpellPower } from "./decorators";

export class Repository<T extends { id: number }> {
  protected items: T[] = [];

  public add(item: T): void {
    this.items.push(item);
  }

  public getAll(): T[] {
    return [...this.items];
  }
}

export class WizardRepository extends Repository<Wizard> {
  private nextId = 1;

 
  public addWizard(data: NewWizard): Wizard {
    const wizard: Wizard = { id: this.nextId++, ...data };
    this.add(wizard);
    return wizard;
  }


  public findByHouse(house: Wizard["house"]): Wizard[] {
    return this.getAll().filter((wizard) => wizard.house === house);
  }
}

export class SpellRepository extends Repository<Spell> {
 
  @ValidateSpellPower
  public override add(spell: Spell): void {
    super.add(spell);
  }
}
