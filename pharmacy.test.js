import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("Regular drugs: should decrease the benefit and expiresIn", () => {
    expect(
      new Pharmacy([
        new Drug("test", 2, 3),
        new Drug("test", 0, 2),
        new Drug("test", 2, 52),
        new Drug("test", 1, -1),
      ]).updateBenefitValue(),
    ).toEqual([
      new Drug("test", 1, 2),
      new Drug("test", -1, 0),
      new Drug("test", 1, 49),
      new Drug("test", 0, 0),
    ]);
  });

  it("Herbal Tea drugs: should increase the benefit and decrease expiresIn", () => {
    const herbalTeaName = "Herbal Tea";
    expect(
      new Pharmacy([
        new Drug(herbalTeaName, 2, 3),
        new Drug(herbalTeaName, 0, 2),
        new Drug(herbalTeaName, 2, 52),
        new Drug(herbalTeaName, 1, -1),
      ]).updateBenefitValue(),
    ).toEqual([
      new Drug(herbalTeaName, 1, 4),
      new Drug(herbalTeaName, -1, 4),
      new Drug(herbalTeaName, 1, 50),
      new Drug(herbalTeaName, 0, 1),
    ]);
  });

  it("Magic pill drugs: should not modify benefit and expiresIn", () => {
    const magicPillName = "Magic Pill";
    expect(
      new Pharmacy([
        new Drug(magicPillName, 2, 3),
        new Drug(magicPillName, 0, 2),
        new Drug(magicPillName, 2, 52),
        new Drug(magicPillName, 1, -1),
      ]).updateBenefitValue(),
    ).toEqual([
      new Drug(magicPillName, 2, 3),
      new Drug(magicPillName, 0, 2),
      new Drug(magicPillName, 2, 50),
      new Drug(magicPillName, 1, 0),
    ]);
  });

  it("Fervex drugs: increment the benefit according to expiration levels and set to 0 if the drug expires", () => {
    const fervexName = "Fervex";
    expect(
      new Pharmacy([
        new Drug(fervexName, 10, 2),
        new Drug(fervexName, 2, 2),
        new Drug(fervexName, 0, 2),
        new Drug(fervexName, 2, 52),
        new Drug(fervexName, 1, -1),
      ]).updateBenefitValue(),
    ).toEqual([
      new Drug(fervexName, 9, 4),
      new Drug(fervexName, 1, 5),
      new Drug(fervexName, -1, 0),
      new Drug(fervexName, 1, 50),
      new Drug(fervexName, 0, 3),
    ]);
  });
});
